import { Stack } from "expo-router";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import CustomNavBar from "../components/CustomNavBar";
import { View } from "react-native";

// Configure Amplify
Amplify.configure(awsExports);

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide the default header
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="protected" />
      </Stack>
      <CustomNavBar />
    </View>
  );
}
