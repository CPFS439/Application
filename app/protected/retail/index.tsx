import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RetailServicesScreen() {
  const router = useRouter();

  // Updated services data with external URLs
  const cpfsServices = [
    {
      id: "1",
      name: "Request A Phone",
      description:
        "Submit form to receive a new phone with 12 months of service.",
      icon: "phone-portrait-outline",
      url: "https://www.cellphonesforsoldiers.com/veteran-phone-application/",
    },
    {
      id: "2",
      name: "Minutes that Matter",
      description: "Submit form to receive phone minutes for service members.",
      icon: "time-outline",
      url: "https://www.cellphonesforsoldiers.com/minutes-that-matter-request-talk-time/",
    },
    {
      id: "3",
      name: "Helping Heroes Home",
      description: "Submit a request to receive financial assistance.",
      icon: "home-outline",
      url: "https://www.cellphonesforsoldiers.com/veterans-aid-helping-heroes-home/",
    },
    {
      id: "4",
      name: "Evergreen Program",
      description: "Veterans request a CPFS Phone service at a reduced rate.",
      icon: "leaf-outline",
    },
    {
      id: "5",
      name: "Submit Phone Donation",
      description: "Submit phone donation to support at-risk-veterans.",
      icon: "gift-outline",
    },
  ];

  // Function to handle opening external URLs
  const handleServicePress = (service) => {
    if (service.url) {
      // Open external URL if available
      Linking.openURL(service.url).catch((err) => {
        console.error("Error opening URL:", err);
        if (Platform.OS === "web") {
          window.alert("Could not open the link. Please try again later.");
        } else {
          alert("Could not open the link. Please try again later.");
        }
      });
    } else {
      // Fall back to the original navigation for services without URLs
      router.push(`/protected/retail/${service.id}`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerText}>CPFS Services</Text>
      <Text style={styles.subHeaderText}>
        Cell Phones For Soldiers provides various services to support military
        members, veterans, and their families
      </Text>

      <View style={styles.servicesContainer}>
        {cpfsServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => handleServicePress(service)}
          >
            <View style={styles.serviceIconContainer}>
              <Ionicons name={service.icon} size={40} color="#3498db" />
            </View>
            <View style={styles.serviceTextContainer}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#13345c"
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About Our Services</Text>
        <Text style={styles.infoText}>
          Cell Phones For Soldiers is dedicated to providing communication
          services and emergency funding to active-duty military members and
          veterans. Our programs aim to keep service members connected with
          their families and provide assistance in times of need.
        </Text>
        <Text style={styles.infoText}>
          Select any of the services above to learn more and submit your
          request. If you have questions about our services, please contact our
          support team.
        </Text>
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
  headerText: {
    fontSize: 28,
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
    paddingHorizontal: 10,
  },
  servicesContainer: {
    marginBottom: 30,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  serviceIconContainer: {
    backgroundColor: "#f0f8ff",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 12,
  },
});
