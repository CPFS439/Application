import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#13345c",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#13345c",
  },
  content: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#13345c",
  },
  // Add any other common styles you want to reuse
});
