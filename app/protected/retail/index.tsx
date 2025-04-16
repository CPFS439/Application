import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomNavBar from "../../../components/CustomNavBar";

// Mock data for retail services
const retailServices = [
  {
    id: "1",
    name: "Grocery Delivery",
    description: "Get groceries delivered to your doorstep",
    image: "https://via.placeholder.com/150",
    category: "Food & Groceries",
  },
  {
    id: "2",
    name: "Clothing Store",
    description: "Shop the latest fashion trends",
    image: "https://via.placeholder.com/150",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Electronics Shop",
    description: "Find the latest tech gadgets",
    image: "https://via.placeholder.com/150",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Home Goods",
    description: "Everything you need for your home",
    image: "https://via.placeholder.com/150",
    category: "Home & Garden",
  },
  {
    id: "5",
    name: "Pharmacy Services",
    description: "Get medications and health products",
    image: "https://via.placeholder.com/150",
    category: "Health",
  },
  {
    id: "6",
    name: "Book Store",
    description: "Discover your next favorite read",
    image: "https://via.placeholder.com/150",
    category: "Books & Media",
  },
];

// Categories for filtering
const categories = [
  "All",
  "Food & Groceries",
  "Fashion",
  "Electronics",
  "Home & Garden",
  "Health",
  "Books & Media",
];

const RetailServicesScreen = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(retailServices);
  const router = useRouter();

  useEffect(() => {
    // Filter services based on selected category
    if (selectedCategory === "All") {
      setFilteredServices(retailServices);
    } else {
      setFilteredServices(
        retailServices.filter(
          (service) => service.category === selectedCategory
        )
      );
    }
  }, [selectedCategory]);

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceItem = ({
    item,
  }: {
    item: (typeof retailServices)[0];
  }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => router.push(`/protected/retail/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryText}>{item.category}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#13345c" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Retail Services",
          headerStyle: {
            backgroundColor: "#3498db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <CustomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  categoriesList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedCategoryItem: {
    backgroundColor: "#3498db",
  },
  categoryText: {
    fontSize: 14,
    color: "#13345c",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  servicesList: {
    padding: 16,
    paddingBottom: 80, // Space for navbar
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  serviceCategory: {
    backgroundColor: "#e8f4fd",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  serviceCategoryText: {
    fontSize: 12,
    color: "#3498db",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RetailServicesScreen;
