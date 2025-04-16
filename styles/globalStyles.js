import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#13345c",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
  content: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
  },
  // Add any other common styles you want to reuse
});
