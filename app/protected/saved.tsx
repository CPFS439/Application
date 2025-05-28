import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react-native";

const client = generateClient();

// Query to list bookmarks for a user
const listBookmarksQuery = /* GraphQL */ `
  query ListBookmarksByUser($userId: ID!) {
    listBookmarks(filter: { userId: { eq: $userId } }) {
      items {
        id
        userId
        charityName
        charityId
        category
        createdAt
      }
    }
  }
`;

// Mutation to delete a bookmark
const deleteBookmarkMutation = /* GraphQL */ `
  mutation DeleteBookmark($input: DeleteBookmarkInput!) {
    deleteBookmark(input: $input) {
      id
    }
  }
`;

function SavedBookmarksScreen() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.userId || user.username || user.sub);
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setError("Failed to authenticate user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  // Fetch bookmarks when userId is available
  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  const fetchBookmarks = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await client.graphql({
        query: listBookmarksQuery,
        variables: { userId: userId },
      });

      console.log("Bookmarks response:", JSON.stringify(response, null, 2));

      const bookmarkItems = response.data.listBookmarks.items;

      // Sort by creation date (newest first)
      bookmarkItems.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setBookmarks(bookmarkItems);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      setError("Failed to load saved charities");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookmarks();
  };

  // Function to perform the actual deletion
  const performRemoveBookmark = async (bookmarkId) => {
    try {
      setDeleteInProgress(true);
      console.log("Deleting bookmark with ID:", bookmarkId);

      // Execute the delete mutation
      const result = await client.graphql({
        query: deleteBookmarkMutation,
        variables: {
          input: { id: bookmarkId },
        },
      });

      console.log("Delete result:", JSON.stringify(result, null, 2));

      // Update the local state by removing the deleted bookmark
      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.id !== bookmarkId)
      );
    } catch (err) {
      console.error("Error removing bookmark:", err);

      // Handle error alert based on platform - just like in menu.tsx
      if (Platform.OS === "web") {
        window.alert(
          `Failed to remove saved charity: ${
            err.message || "Unknown error"
          }. Please try again.`
        );
      } else {
        Alert.alert(
          "Error",
          `Failed to remove saved charity: ${
            err.message || "Unknown error"
          }. Please try again.`
        );
      }
    } finally {
      setDeleteInProgress(false);
    }
  };

  // Function to confirm deletion with the user
  const confirmRemoveBookmark = (bookmark) => {
    console.log("Remove button pressed for:", bookmark.charityName);

    // Use different alert methods based on platform - just like in menu.tsx
    if (Platform.OS === "web") {
      // For web, use window.confirm
      if (
        window.confirm(
          `Are you sure you want to remove "${bookmark.charityName}" from your saved charities?`
        )
      ) {
        performRemoveBookmark(bookmark.id);
      }
    } else {
      // For mobile, use React Native Alert
      Alert.alert(
        "Remove Saved Charity",
        `Are you sure you want to remove "${bookmark.charityName}" from your saved charities?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            onPress: () => performRemoveBookmark(bookmark.id),
            style: "destructive",
          },
        ]
      );
    }
  };

  const navigateToCharityDetails = (charityName) => {
    router.push(
      `/protected/charity/details/${encodeURIComponent(charityName)}`
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading saved charities...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Saved Charities</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBookmarks}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No saved charities yet</Text>
          <Text style={styles.emptySubtext}>
            Bookmark charities you're interested in to find them here
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push("/protected/charity")}
          >
            <Text style={styles.browseButtonText}>Browse Charities</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookmarkCard}
              onPress={() => navigateToCharityDetails(item.charityName)}
            >
              <View style={styles.bookmarkContent}>
                <Text style={styles.charityName}>{item.charityName}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>
                    {item.category || "General"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => confirmRemoveBookmark(item)}
                disabled={deleteInProgress}
              >
                {deleteInProgress ? (
                  <ActivityIndicator size="small" color="#d23631" />
                ) : (
                  <Ionicons name="close-circle" size={24} color="#d23631" />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingBottom: 80, // Space for bottom nav bar
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  browseButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  bookmarkCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookmarkContent: {
    flex: 1,
  },
  charityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: "#e1f5fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  categoryText: {
    fontSize: 12,
    color: "#0277bd",
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
  },
});

export default withAuthenticator(SavedBookmarksScreen);
