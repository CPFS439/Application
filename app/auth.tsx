import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { useRouter } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";

function AuthScreen({ user, signOut }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount and when user prop changes
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        // If we already have a user from props, use that
        if (user) {
          console.log("User already authenticated, redirecting to profile");
          router.replace("/protected/profile");
          return;
        }

        // Otherwise, check with Amplify directly
        const currentUser = await getCurrentUser();
        if (currentUser) {
          console.log(
            "User authenticated via getCurrentUser, redirecting to profile"
          );
          router.replace("/protected/profile");
        }
      } catch (err) {
        console.error("Error checking authentication status:", err);
        setError("Authentication check failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, [user, router]);

  // If still loading, show a spinner
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Authenticating...</Text>
      </View>
    );
  }

  // If there was an error
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Default state - user should be in the process of authenticating
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Please complete the authentication process
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default withAuthenticator(AuthScreen);
