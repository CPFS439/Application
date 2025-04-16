import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../styles/globalStyles";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

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
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>User Profile</Text>
      <Text style={globalStyles.content}>
        Email: {user.signInDetails?.loginId || "N/A"}
      </Text>
      <Text style={globalStyles.content}>This is a PROTECTED ROUTE</Text>
    </View>
  );
}
