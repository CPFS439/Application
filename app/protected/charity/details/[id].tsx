import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { globalStyles } from "../../../../styles/globalStyles";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { generateClient } from "aws-amplify/api";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser } from "aws-amplify/auth";

// Define a query to get charity by name
const getCharityByNameQuery = /* GraphQL */ `
  query ListCharitiesWithCategories($name: String!) {
    listCharitiesWithCategories(filter: { name: { eq: $name } }) {
      items {
        id
        name
        mission
        email
        phone
        website
        program
        programDescription
        processLink
        product
        category
      }
    }
  }
`;

// Define a mutation to create a bookmark
const createBookmarkMutation = /* GraphQL */ `
  mutation CreateBookmark($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
      userId
      charityName
      charityId
      category
      createdAt
    }
  }
`;

// Define a mutation to delete a bookmark
const deleteBookmarkMutation = /* GraphQL */ `
  mutation DeleteBookmark($input: DeleteBookmarkInput!) {
    deleteBookmark(input: $input) {
      id
    }
  }
`;

// Define a query to check if a charity is bookmarked
const getBookmarkQuery = /* GraphQL */ `
  query GetBookmarkByUserAndCharity($userId: ID!, $charityName: String!) {
    listBookmarks(
      filter: { userId: { eq: $userId }, charityName: { eq: $charityName } }
    ) {
      items {
        id
      }
    }
  }
`;

const client = generateClient();

function CharityDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Use the ID parameter as the charity name
  const charityName = decodeURIComponent(params.id?.toString() || "");

  // Fetch user ID from Cognito
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.userId || user.username || user.sub);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    fetchUserId();
  }, []);

  // Check if charity is bookmarked
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId || !charityName) return;

      try {
        const response = await client.graphql({
          query: getBookmarkQuery,
          variables: {
            userId: userId,
            charityName: charityName,
          },
        });

        const bookmarks = response.data.listBookmarks.items;
        if (bookmarks && bookmarks.length > 0) {
          setIsBookmarked(true);
          setBookmarkId(bookmarks[0].id);
        } else {
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } catch (err) {
        console.error("Error checking bookmark status:", err);
      }
    };

    checkBookmarkStatus();
  }, [userId, charityName]);

  useEffect(() => {
    async function fetchCharityDetails() {
      if (!charityName) {
        setLoading(false);
        setError("No charity name provided");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching charity with name:", charityName);

        // Query the GraphQL API for the charity by name
        const response = await client.graphql({
          query: getCharityByNameQuery,
          variables: { name: charityName },
        });

        // Extract the charity from the response
        const charities = response.data.listCharitiesWithCategories.items;
        console.log(
          "Charity query response:",
          JSON.stringify(charities, null, 2)
        );

        if (charities && charities.length > 0) {
          setCharity(charities[0]);
          setError(null);
        } else {
          setError("Charity not found");
        }
      } catch (err) {
        console.error("Error fetching charity details:", err);
        setError(`Failed to load charity details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCharityDetails();
  }, [charityName]);

  const handleWebsitePress = () => {
    if (charity?.website) {
      let url = charity.website;
      // Add https:// if not present
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      Linking.openURL(url);
    }
  };

  const handleProcessLinkPress = () => {
    if (charity?.processLink) {
      let url = charity.processLink;
      // Add https:// if not present
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      Linking.openURL(url);
    }
  };

  const toggleBookmark = async () => {
    if (!userId || !charity) {
      Alert.alert("Error", "Unable to bookmark. Please try again later.");
      return;
    }

    setBookmarkLoading(true);

    try {
      if (isBookmarked) {
        // Delete bookmark
        await client.graphql({
          query: deleteBookmarkMutation,
          variables: {
            input: { id: bookmarkId },
          },
        });

        setIsBookmarked(false);
        setBookmarkId(null);
      } else {
        // Create bookmark
        const response = await client.graphql({
          query: createBookmarkMutation,
          variables: {
            input: {
              userId: userId,
              charityName: charity.name,
              charityId: charity.id || "",
              category: charity.category || "General",
            },
          },
        });

        const newBookmark = response.data.createBookmark;
        setIsBookmarked(true);
        setBookmarkId(newBookmark.id);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      Alert.alert("Error", "Failed to update bookmark. Please try again.");
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading charity information...</Text>
      </View>
    );
  }

  if (error || !charity) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Charity not found"}</Text>
        <Button title="Go Back" onPress={() => router.back()} color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{charity.name}</Text>
        <Text style={styles.subtitle}>{charity.category || "General"}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {charity.mission ||
              charity.programDescription ||
              "No description available."}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Program</Text>
          <Text style={styles.description}>
            {charity.program || "No program information available."}
          </Text>
          <Text style={styles.description}>
            {charity.programDescription || ""}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Details</Text>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={toggleBookmark}
              disabled={bookmarkLoading}
            >
              {bookmarkLoading ? (
                <ActivityIndicator size="small" color="#13345c" />
              ) : (
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isBookmarked ? "#d23631" : "#13345c"}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Website:</Text>
            <Text
              style={[styles.detailValue, charity.website ? styles.link : null]}
              onPress={charity.website ? handleWebsitePress : null}
            >
              {charity.website || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{charity.email || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{charity.phone || "N/A"}</Text>
          </View>
          {charity.processLink && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Process Link:</Text>
              <Text
                style={[styles.detailValue, styles.link]}
                onPress={handleProcessLinkPress}
              >
                View Process
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Support This Charity"
            color="#3498db"
            onPress={() => {
              if (charity.website) {
                handleWebsitePress();
              } else if (charity.email) {
                Linking.openURL(`mailto:${charity.email}`);
              }
            }}
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Back to Charities"
            onPress={() => router.back()}
            color="#666"
          />
        </View>
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
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoSection: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Section header with bookmark
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 10,
  },
  bookmarkButton: {
    padding: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: 120,
    color: "#13345c",
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    color: "#555",
  },
  link: {
    color: "#3498db",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  buttonSpacer: {
    height: 12,
  },
});

export default withAuthenticator(CharityDetailScreen);
