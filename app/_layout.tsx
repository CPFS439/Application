import React from "react";
import { Stack } from "expo-router";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import TopNavBar from "../components/TopNavBar";
import CustomNavBar from "../components/CustomNavBar";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <TopNavBar />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.stackContent,
        }}
      />
      <CustomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  stackContent: {
    backgroundColor: "#f5f5f5",
    // No additional padding or margin here
  },
});
