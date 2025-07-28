import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import React from "react";
import { Stack } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import TopNavBar from "../components/TopNavBar";
import CustomNavBar from "../components/CustomNavBar";
import useFonts from "../hooks/useFonts";

export default function RootLayout() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.stackContent,
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTitleStyle: {
            fontFamily: "OpenSans-SemiBold",
          },
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
  },
});
