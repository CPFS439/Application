import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";

const client = generateClient();

// GraphQL queries and mutations
const getUserByEmailQuery = /* GraphQL */ `
  query GetUserByEmail($email: String!) {
    listUsers(filter: { email: { eq: $email } }) {
      items {
        id
        email
        militaryBranch
        age
        phoneNumber
        profilePicture
        address {
          street
          city
          state
          zipCode
          country
        }
      }
    }
  }
`;

const createUserMutation = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      militaryBranch
      age
      phoneNumber
      profilePicture
      address {
        street
        city
        state
        zipCode
        country
      }
    }
  }
`;

const updateUserMutation = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      militaryBranch
      age
      phoneNumber
      profilePicture
      address {
        street
        city
        state
        zipCode
        country
      }
    }
  }
`;

// Placeholder user profile data with added address fields
const PLACEHOLDER_USER_PROFILE = {
  militaryBranch: "Air Force",
  age: "28",
  phoneNumber: "(555) 123-4567",
  profilePicture: null,
  address: {
    street: "123 Veterans Way",
    city: "Arlington",
    state: "VA",
    zipCode: "22209",
    country: "USA",
  },
};

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    ...PLACEHOLDER_USER_PROFILE,
  });
  const [imageLoading, setImageLoading] = useState(false);

  // Function to fetch the profile image from S3
  const fetchProfileImage = async (imageKey) => {
    if (!imageKey) return null;

    try {
      console.log("Fetching image with key:", imageKey);

      const imageUrl = await getUrl({
        key: imageKey,
        options: {
          accessLevel: "private",
          validateObjectExistence: true,
        },
      });

      console.log("Image URL:", imageUrl.url.toString());
      return imageUrl.url.toString();
    } catch (error) {
      console.error("Error fetching image from S3:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get authenticated user
        const userData = await getCurrentUser();
        setUser(userData);

        if (userData && userData.signInDetails?.loginId) {
          // Fetch user profile from GraphQL API
          const email = userData.signInDetails.loginId;
          const response = await client.graphql({
            query: getUserByEmailQuery,
            variables: { email },
          });

          console.log(
            "User profile response:",
            JSON.stringify(response, null, 2)
          );

          const userItems = response.data.listUsers.items;

          if (userItems && userItems.length > 0) {
            // User exists in database
            const userProfileData = userItems[0];
            setUserProfile(userProfileData);
            setEditedProfile(userProfileData);

            // Fetch profile image from S3 if available
            if (userProfileData.profilePicture) {
              const imageUrl = await fetchProfileImage(
                userProfileData.profilePicture
              );
              if (imageUrl) {
                setProfileImage(imageUrl);
              }
            }
          } else {
            // User doesn't exist, create a new user profile
            console.log("User not found in database, creating new profile");
            const newUser = {
              email: email,
              ...PLACEHOLDER_USER_PROFILE,
            };

            const createResponse = await client.graphql({
              query: createUserMutation,
              variables: {
                input: newUser,
              },
            });

            const createdUser = createResponse.data.createUser;
            setUserProfile(createdUser);
            setEditedProfile(createdUser);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to placeholder data
        setUserProfile(PLACEHOLDER_USER_PROFILE);
        setEditedProfile(PLACEHOLDER_USER_PROFILE);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const pickImage = async () => {
    // Request permission
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        setImageLoading(true);
        const selectedImage = result.assets[0];

        // Generate a unique key for the image - THIS IS STEP 1 CODE
        const imageKey = `profile-images/${userProfile.id}/${uuidv4()}`;
        console.log("Uploading image with key:", imageKey);

        // For web, we need to fetch the blob from the URI
        let imageBlob;
        if (Platform.OS === "web") {
          const response = await fetch(selectedImage.uri);
          imageBlob = await response.blob();
        } else {
          // For native platforms, we can use the URI directly
          const response = await fetch(selectedImage.uri);
          imageBlob = await response.blob();
        }

        // Upload the image to S3
        await uploadData({
          key: imageKey,
          data: imageBlob,
          options: {
            accessLevel: "private", // Use private for authenticated users
            contentType: "image/jpeg", // or the appropriate mime type
          },
        });

        console.log("Image uploaded successfully");

        // Get the URL of the uploaded image
        const imageUrl = await fetchProfileImage(imageKey);
        console.log("Retrieved image URL:", imageUrl);

        if (imageUrl) {
          setProfileImage(imageUrl);
        } else {
          // If we couldn't get the URL, at least show the local image temporarily
          setProfileImage(selectedImage.uri);
        }

        // Delete the old image from S3 if it exists
        if (userProfile.profilePicture) {
          try {
            await remove({
              key: userProfile.profilePicture,
              options: {
                accessLevel: "private", // Use private for authenticated users
              },
            });
            console.log("Old image deleted successfully");
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue even if deletion fails
          }
        }

        // Update the user profile with the new image key - THIS IS ALSO PART OF STEP 1
        if (userProfile && userProfile.id) {
          try {
            const updatedUser = {
              id: userProfile.id,
              profilePicture: imageKey, // Store just the key without the identity ID
            };

            const response = await client.graphql({
              query: updateUserMutation,
              variables: {
                input: updatedUser,
              },
            });

            // Update local state
            const updatedUserData = response.data.updateUser;
            setUserProfile(updatedUserData);
            console.log("User profile updated with new image key");
          } catch (updateError) {
            console.error("Error updating user profile:", updateError);
            Alert.alert("Error", "Failed to update profile with new image");
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload profile picture");
      } finally {
        setImageLoading(false);
      }
    }
  };

  const openEditModal = () => {
    setEditedProfile({ ...userProfile });
    setEditModalVisible(true);
  };

  const saveProfile = async () => {
    try {
      if (userProfile && userProfile.id) {
        // Update existing user
        const updatedUser = {
          id: userProfile.id,
          militaryBranch: editedProfile.militaryBranch,
          age: editedProfile.age,
          phoneNumber: editedProfile.phoneNumber,
          address: editedProfile.address,
        };

        const response = await client.graphql({
          query: updateUserMutation,
          variables: {
            input: updatedUser,
          },
        });

        const updatedUserData = response.data.updateUser;
        setUserProfile(updatedUserData);

        setEditModalVisible(false);
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>Loading user profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>
          Unable to load user profile. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>User Profile</Text>
        </View>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} disabled={imageLoading}>
            {imageLoading ? (
              <View style={styles.placeholderImage}>
                <Text style={styles.loadingText}>Uploading...</Text>
              </View>
            ) : profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  {user.signInDetails?.loginId?.charAt(0).toUpperCase() || "?"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Tap to change photo</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>
              {user.signInDetails?.loginId || "N/A"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Military Branch:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.militaryBranch || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.age || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.phoneNumber || "Not specified"}
            </Text>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Street:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.address?.street || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.address?.city || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>State:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.address?.state || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Zip Code:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.address?.zipCode || "Not specified"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Country:</Text>
            <Text style={styles.infoValue}>
              {userProfile?.address?.country || "Not specified"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.inputLabel}>Military Branch</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.militaryBranch}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, militaryBranch: text })
                }
                placeholder="Enter military branch"
              />

              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.age}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, age: text })
                }
                placeholder="Enter age"
                keyboardType="number-pad"
              />

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.phoneNumber}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, phoneNumber: text })
                }
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />

              <Text style={styles.sectionTitle}>Address</Text>

              <Text style={styles.inputLabel}>Street</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address?.street}
                onChangeText={(text) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: { ...editedProfile.address, street: text },
                  })
                }
                placeholder="Enter street address"
              />

              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address?.city}
                onChangeText={(text) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: { ...editedProfile.address, city: text },
                  })
                }
                placeholder="Enter city"
              />

              <Text style={styles.inputLabel}>State</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address?.state}
                onChangeText={(text) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: { ...editedProfile.address, state: text },
                  })
                }
                placeholder="Enter state"
              />

              <Text style={styles.inputLabel}>Zip Code</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address?.zipCode}
                onChangeText={(text) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: { ...editedProfile.address, zipCode: text },
                  })
                }
                placeholder="Enter zip code"
                keyboardType="number-pad"
              />

              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.address?.country}
                onChangeText={(text) =>
                  setEditedProfile({
                    ...editedProfile,
                    address: { ...editedProfile.address, country: text },
                  })
                }
                placeholder="Enter country"
              />
            </ScrollView>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
    alignItems: "center",
  },
  header: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#2196F3",
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#2196F3",
  },
  placeholderText: {
    fontSize: 60,
    color: "#888",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
  changePhotoText: {
    marginTop: 8,
    color: "#2196F3",
    fontSize: 14,
  },
  infoSection: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    flex: 1,
    fontWeight: "bold",
    color: "#555",
    fontSize: 16,
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 30,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 500,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 20,
    textAlign: "center",
  },
  modalScrollView: {
    maxHeight: 400,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
