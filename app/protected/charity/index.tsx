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

export default function CharityServicesScreen() {
  const router = useRouter();

  // Sample charity services data
  const charityServices = [
    {
      id: "1",
      name: "Food Bank",
      description: "Donate to local food banks",
      icon: "nutrition",
    },
    {
      id: "2",
      name: "Clothing Drive",
      description: "Donate clothes to those in need",
      icon: "shirt",
    },
    {
      id: "3",
      name: "Volunteer",
      description: "Volunteer your time for community service",
      icon: "people",
    },
    {
      id: "4",
      name: "Fundraising",
      description: "Support fundraising campaigns",
      icon: "cash",
    },
    {
      id: "5",
      name: "Education",
      description: "Support educational programs",
      icon: "school",
    },
    {
      id: "6",
      name: "Healthcare",
      description: "Support healthcare initiatives",
      icon: "medkit",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerText}>Charity Services</Text>
      <Text style={styles.subHeaderText}>
        Make a difference in your community
      </Text>

      <View style={styles.servicesGrid}>
        {charityServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => router.push(`/protected/charity/${service.id}`)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={service.icon} size={32} color="#3498db" />
            </View>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
