import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RetailServicesScreen() {
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.headerText}>Retail Services</Text>
        <Text style={styles.subHeaderText}>Shop from our trusted partners</Text>

        <View style={styles.servicesGrid}>
          {retailServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => router.push(`/protected/retail/${service.id}`)}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={service.icon} size={32} color="#3498db" />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
  },
});
