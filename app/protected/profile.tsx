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
} from "react-native";
import { getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";

// Placeholder user profile data
const PLACEHOLDER_USER_PROFILE = {
  militaryBranch: "Air Force",
  age: "28",
  phoneNumber: "(555) 123-4567",
  profilePicture: null,
};

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(PLACEHOLDER_USER_PROFILE);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get authenticated user
        const userData = await getCurrentUser();
        setUser(userData);

        // Using placeholder data instead of DataStore
        setUserProfile(PLACEHOLDER_USER_PROFILE);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      const newImage = result.assets[0].uri;
      setProfileImage(newImage);

      // Update local state only (no DataStore)
      setUserProfile({
        ...userProfile,
        profilePicture: newImage,
      });
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
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
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

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Profile editing will be available in a future update."
            )
          }
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
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
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
