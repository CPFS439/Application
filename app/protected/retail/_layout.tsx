import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getCurrentUser } from "aws-amplify/auth";

export default function RetailLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  // Show loading indicator while checking authentication
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  // Redirect to auth screen if not authenticated
  if (isAuthenticated === false) {
    return <Redirect href="/protected" />;
  }

  // User is authenticated, show the retail services content
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
