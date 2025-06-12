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

export default function ServicesMapScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerSection}>
        <Ionicons name="map" size={80} color="#3498db" style={styles.mapIcon} />
        <Text style={styles.headerText}>Veteran Public Services Map</Text>
        <Text style={styles.subHeaderText}>
          Interactive map coming soon to help you find veteran services in your
          area
        </Text>
      </View>

      <View style={styles.placeholderContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="location" size={60} color="#bdc3c7" />
          <Text style={styles.placeholderText}>Map View</Text>
          <Text style={styles.placeholderSubtext}>
            Google Maps integration will be displayed here
          </Text>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Planned Features</Text>

        <View style={styles.featureItem}>
          <Ionicons name="search" size={24} color="#3498db" />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Search Services</Text>
            <Text style={styles.featureDescription}>
              Find veteran services by location, type, or name
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="pin" size={24} color="#3498db" />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Service Locations</Text>
            <Text style={styles.featureDescription}>
              View VA hospitals, clinics, and community resources on the map
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="navigate" size={24} color="#3498db" />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Directions</Text>
            <Text style={styles.featureDescription}>
              Get turn-by-turn directions to service locations
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="information-circle" size={24} color="#3498db" />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Service Details</Text>
            <Text style={styles.featureDescription}>
              View hours, contact information, and available services
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.statusTitle}>Development Status</Text>
        <Text style={styles.statusText}>
          This feature is currently under development. We're working to
          integrate Google Maps to provide you with the best experience for
          finding veteran services in your area.
        </Text>
        <Text style={styles.statusText}>Check back soon for updates!</Text>
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
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapIcon: {
    marginBottom: 16,
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
    textAlign: "center",
    lineHeight: 22,
  },
  placeholderContainer: {
    marginBottom: 30,
  },
  mapPlaceholder: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bdc3c7",
    marginTop: 12,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: "#95a5a6",
    textAlign: "center",
  },
  featuresSection: {
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
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  statusSection: {
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
  statusTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 12,
  },
});
