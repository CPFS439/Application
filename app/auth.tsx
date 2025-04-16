import React from "react";
import { View, Text } from "react-native";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { useRouter } from "expo-router";

function AuthScreen({ user }) {
  const router = useRouter();

  // If we get here with a user, redirect to profile
  React.useEffect(() => {
    if (user) {
      router.replace("/protected/profile");
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Authenticating...</Text>
    </View>
  );
}

export default withAuthenticator(AuthScreen);
