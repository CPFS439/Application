import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomNavBar from "../../../components/CustomNavBar";

// Mock data for retail stores (same structure as in index.tsx)
const retailStores = [
  {
    id: "1",
    name: "Fresh Market",
    category: "Grocery Shopping",
    description: "Organic and fresh produce with military discount",
    location: "Multiple locations nationwide",
    discount: "10% off for military personnel",
  },
  {
    id: "2",
    name: "Veteran Apparel",
    category: "Clothing",
    description: "Quality clothing with exclusive military designs",
    location: "Online store with free shipping",
    discount: "15% off for veterans",
  },
  {
    id: "3",
    name: "Tech Warriors",
    category: "Electronics",
    description: "Latest electronics with special military pricing",
    location: "San Diego, CA and online",
    discount: "Military pricing on select items",
  },
  {
    id: "4",
    name: "Home Base Furnishings",
    category: "Home Goods",
    description: "Quality furniture for military families",
    location: "Near major military bases",
    discount: "Free delivery for active duty",
  },
  {
    id: "5",
    name: "Service Beauty Supply",
    category: "Beauty Products",
    description: "Premium beauty products for all",
    location: "Online with nationwide shipping",
    discount: "Military family discount available",
  },
  {
    id: "6",
    name: "Veteran Bookstore",
    category: "Books & Media",
    description: "Books, movies and more with military focus",
    location: "Washington DC and online",
    discount: "Buy one, get one 50% off for veterans",
  },
  {
    id: "7",
    name: "Military Grocery Delivery",
    category: "Grocery Shopping",
    description: "Grocery delivery service near military bases",
    location: "Available near all major bases",
    discount: "Free delivery for orders over $50",
  },
  {
    id: "8",
    name: "Tactical Electronics",
    category: "Electronics",
    description: "Rugged and reliable electronics",
    location: "Online store with global shipping",
    discount: "20% military discount on all items",
  },
];

const RetailStoreDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundStore = retailStores.find((s) => s.id === id);
      if (foundStore) {
        setStore(foundStore);
        setError(null);
      } else {
        setError("Store not found");
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading store information...</Text>
      </View>
    );
  }

  if (error || !store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Store not found"}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push(`/protected/retail/${id}`)}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>{store.name}</Text>
        <Text style={styles.subtitle}>{store.category}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{store.description}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{store.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Discount:</Text>
            <Text style={styles.detailValue}>{store.discount}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // In a real app, this would navigate to a contact form or website
              alert("This would open the store's website or contact form");
            }}
          >
            <Text style={styles.actionButtonText}>Contact This Store</Text>
          </TouchableOpacity>

          <View style={styles.buttonSpacer} />

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Back to Stores</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80, // Space for navbar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoSection: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#13345c",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: 120,
    color: "#13345c",
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    color: "#555",
  },
  link: {
    color: "#3498db",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  buttonSpacer: {
    height: 12,
  },
  actionButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RetailStoreDetailScreen;
