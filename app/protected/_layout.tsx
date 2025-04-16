import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../styles/globalStyles";

export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Not authenticated", error);
        // Redirect to home
        router.replace("/");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={globalStyles.content}>Checking authentication...</Text>
      </View>
    );
  }

  // Only render the protected content if authenticated
  return isAuthenticated ? (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  ) : null;
}
