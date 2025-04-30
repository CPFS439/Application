import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RetailServicesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample retail services data
  const retailServices = [
    {
      id: "1",
      name: "Grocery Shopping",
      description: "Order groceries online",
      icon: "basket",
    },
    {
      id: "2",
      name: "Clothing",
      description: "Shop for clothes and accessories",
      icon: "shirt",
    },
    {
      id: "3",
      name: "Electronics",
      description: "Latest gadgets and devices",
      icon: "laptop",
    },
    {
      id: "4",
      name: "Home Goods",
      description: "Furniture and home decor",
      icon: "home",
    },
    {
      id: "5",
      name: "Beauty Products",
      description: "Cosmetics and personal care",
      icon: "sparkles",
    },
    {
      id: "6",
      name: "Books & Media",
      description: "Books, movies, and music",
      icon: "book",
    },
  ];

  // Sample retail stores data
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

  // Filter retail stores based on search query
  const filteredStores = retailStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.discount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Categories section */}
      <View style={styles.servicesGrid}>
        {retailServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => {
              setSearchQuery(service.name);
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={service.icon} size={24} color="#3498db" />
            </View>
            <Text style={styles.serviceName}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search retail stores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Retail stores list */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Available Retail Stores</Text>
        {filteredStores.length === 0 ? (
          <Text style={styles.noResults}>
            No retail stores found matching your search.
          </Text>
        ) : (
          filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeCard}
              onPress={() =>
                router.push(`/protected/retail/details/${store.id}`)
              }
            >
              <View style={styles.storeHeader}>
                <Text style={styles.storeName}>{store.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{store.category}</Text>
                </View>
              </View>
              <Text style={styles.storeDescription}>{store.description}</Text>
              <View style={styles.storeDetails}>
                <View style={styles.storeLocation}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.locationText}>{store.location}</Text>
                </View>
                <View style={styles.storeDiscount}>
                  <Ionicons name="pricetag" size={16} color="#4CAF50" />
                  <Text style={styles.discountText}>{store.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "31%", // Smaller cards (3 per row)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#13345c",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  noResults: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontStyle: "italic",
  },
  storeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: "#e1f5fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#0277bd",
    fontWeight: "500",
  },
  storeDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  storeDetails: {
    marginTop: 4,
  },
  storeLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  storeDiscount: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
    marginLeft: 4,
  },
});
