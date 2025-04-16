import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);
import { Link } from "expo-router";
import { globalStyles } from "../styles/globalStyles"; // Import global styles

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcomeText}>Welcome to CFS Marketplace</Text>
      <Text style={globalStyles.subtitle}>This is a PUBLIC ROUTE</Text>

      <Link href="/protected/charity" asChild>
        <Button title="Go to Charities" />
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 20,
    textAlign: "center",
  },
});
