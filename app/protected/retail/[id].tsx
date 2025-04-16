import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomNavBar from "../../../components/CustomNavBar";

// Mock data for retail services (same as in index.tsx)
const retailServices = [
  {
    id: "1",
    name: "Grocery Delivery",
    description: "Get groceries delivered to your doorstep",
    image: "https://via.placeholder.com/150",
    category: "Food & Groceries",
    longDescription:
      "Our grocery delivery service brings fresh produce, pantry staples, and household essentials right to your door. Shop from a wide selection of items and enjoy convenient delivery options that fit your schedule.",
    contact: {
      phone: "555-123-4567",
      email: "groceries@example.com",
      website: "www.grocerydelivery.example.com",
    },
  },
  {
    id: "2",
    name: "Clothing Store",
    description: "Shop the latest fashion trends",
    image: "https://via.placeholder.com/150",
    category: "Fashion",
    longDescription:
      "Discover the latest fashion trends for all seasons. Our clothing store offers a wide range of apparel for men, women, and children, from casual wear to formal attire. We also carry accessories to complete your look.",
    contact: {
      phone: "555-234-5678",
      email: "fashion@example.com",
      website: "www.fashionstore.example.com",
    },
  },
  {
    id: "3",
    name: "Electronics Shop",
    description: "Find the latest tech gadgets",
    image: "https://via.placeholder.com/150",
    category: "Electronics",
    longDescription:
      "Stay up-to-date with the latest technology at our electronics shop. We offer smartphones, computers, home entertainment systems, and smart home devices. Our knowledgeable staff can help you find the perfect tech solution.",
    contact: {
      phone: "555-345-6789",
      email: "tech@example.com",
      website: "www.electronicshop.example.com",
    },
  },
  {
    id: "4",
    name: "Home Goods",
    description: "Everything you need for your home",
    image: "https://via.placeholder.com/150",
    category: "Home & Garden",
    longDescription:
      "Transform your living space with our selection of home goods. From furniture and decor to kitchen essentials and bedding, we have everything you need to make your house a home. We also offer seasonal items to keep your space fresh.",
    contact: {
      phone: "555-456-7890",
      email: "home@example.com",
      website: "www.homegoods.example.com",
    },
  },
  {
    id: "5",
    name: "Pharmacy Services",
    description: "Get medications and health products",
    image: "https://via.placeholder.com/150",
    category: "Health",
    longDescription:
      "Our pharmacy provides prescription medications, over-the-counter remedies, and health-related products. Our pharmacists are available to answer your questions and provide guidance on medications and health concerns.",
    contact: {
      phone: "555-567-8901",
      email: "health@example.com",
      website: "www.pharmacy.example.com",
    },
  },
  {
    id: "6",
    name: "Book Store",
    description: "Discover your next favorite read",
    image: "https://via.placeholder.com/150",
    category: "Books & Media",
    longDescription:
      "Browse our extensive collection of books spanning all genres. From bestsellers and classics to niche topics and local authors, we have something for every reader. We also host regular book clubs and author events.",
    contact: {
      phone: "555-678-9012",
      email: "books@example.com",
      website: "www.bookstore.example.com",
    },
  },
];

const RetailServiceDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<(typeof retailServices)[0] | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundService = retailServices.find((s) => s.id === id);
      setService(foundService || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Service not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: service.name,
          headerStyle: {
            backgroundColor: "#3498db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Image source={{ uri: service.image }} style={styles.image} />

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{service.name}</Text>
          <Text style={styles.description}>{service.longDescription}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color="#3498db" />
            <Text style={styles.contactText}>{service.contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color="#3498db" />
            <Text style={styles.contactText}>{service.contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="globe" size={20} color="#3498db" />
            <Text style={styles.contactText}>{service.contact.website}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Contact This Service</Text>
        </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#d23631",
    marginBottom: 20,
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80, // Space for navbar
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  categoryBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#3498db",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: "#3498db",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RetailServiceDetailScreen;
