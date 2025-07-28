import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MapComponent from "../../components/MapComponent";

const { width, height } = Dimensions.get("window");

interface Service {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;
  address: string;
  phone: string;
}

export default function ServicesMapScreen() {
  const router = useRouter();
  const mapComponentRef = useRef<any>(null);

  // Houston area veteran service locations
  const veteranServices: Service[] = [
    {
      id: 1,
      title: "Michael E. DeBakey VA Medical Center",
      description: "Full-service medical facility and emergency care",
      latitude: 29.703,
      longitude: -95.401,
      type: "hospital",
      address: "2002 Holcombe Blvd, Houston, TX 77030",
      phone: "(713) 791-1414",
    },
    {
      id: 2,
      title: "VA Outpatient Clinic - Northwest Houston",
      description: "Primary care and specialty services",
      latitude: 29.8735,
      longitude: -95.5426,
      type: "clinic",
      address: "7400 Fannin St, Houston, TX 77054",
      phone: "(713) 794-7100",
    },
    {
      id: 3,
      title: "Houston Vet Center",
      description: "Counseling and mental health services",
      latitude: 29.7372,
      longitude: -95.4618,
      type: "support",
      address: "503 Westheimer Rd, Houston, TX 77006",
      phone: "(713) 523-0884",
    },
    {
      id: 4,
      title: "VA Clinic - Southeast Houston",
      description: "Outpatient medical services",
      latitude: 29.6436,
      longitude: -95.2784,
      type: "clinic",
      address: "8900 Telephone Rd, Houston, TX 77061",
      phone: "(713) 794-7100",
    },
    {
      id: 5,
      title: "Cy-Fair VA Clinic",
      description: "Primary care and mental health services",
      latitude: 29.9857,
      longitude: -95.6544,
      type: "support",
      address: "13550 Veterans Dr, Houston, TX 77014",
      phone: "(281) 893-4400",
    },
  ];

  const handleServiceLocationPress = (service: Service) => {
    // Zoom map to this location instead of showing alert
    if (mapComponentRef.current && mapComponentRef.current.zoomToLocation) {
      mapComponentRef.current.zoomToLocation(
        service.latitude,
        service.longitude
      );
    }
  };

  // Convert services to map locations format
  const mapLocations = veteranServices.map((service) => ({
    latitude: service.latitude,
    longitude: service.longitude,
    title: service.title,
    description: service.description,
    address: service.address,
    phone: service.phone,
    type: service.type,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Houston Area Veteran Services</Text>
        <Text style={styles.subHeaderText}>
          Find veteran services in the Houston area
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapComponent
          ref={mapComponentRef}
          locations={mapLocations}
          initialRegion={{
            latitude: 29.7604,
            longitude: -95.3698,
            zoom: 10,
          }}
          onMarkerPress={undefined} // Remove marker press functionality
        />
      </View>

      <ScrollView
        style={styles.bottomSheet}
        contentContainerStyle={styles.bottomSheetContent}
      >
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Service Types</Text>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#e74c3c" }]} />
            <Ionicons
              name="medical"
              size={16}
              color="#e74c3c"
              style={styles.legendIcon}
            />
            <Text style={styles.legendText}>VA Medical Centers</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#3498db" }]} />
            <Ionicons
              name="fitness"
              size={16}
              color="#3498db"
              style={styles.legendIcon}
            />
            <Text style={styles.legendText}>VA Clinics</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#2ecc71" }]} />
            <Ionicons
              name="people"
              size={16}
              color="#2ecc71"
              style={styles.legendIcon}
            />
            <Text style={styles.legendText}>Vet Centers</Text>
          </View>
        </View>

        <View style={styles.servicesListSection}>
          <Text style={styles.servicesListTitle}>
            Service Locations ({veteranServices.length})
          </Text>
          <Text style={styles.servicesListSubtitle}>
            Tap any location to zoom the map
          </Text>
          {veteranServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServiceLocationPress(service)}
            >
              <View
                style={[
                  styles.serviceTypeIndicator,
                  {
                    backgroundColor:
                      service.type === "hospital"
                        ? "#e74c3c"
                        : service.type === "clinic"
                        ? "#3498db"
                        : "#2ecc71",
                  },
                ]}
              />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
                <Text style={styles.serviceAddress}>{service.address}</Text>
                <Text style={styles.servicePhone}>{service.phone}</Text>
              </View>
              <Ionicons name="locate" size={20} color="#3498db" />
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
  headerSection: {
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
    minHeight: height * 0.4,
  },
  bottomSheet: {
    maxHeight: height * 0.4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    padding: 20,
    paddingBottom: 80,
  },
  legendSection: {
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendIcon: {
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#666",
  },
  servicesListSection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  servicesListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 4,
  },
  servicesListSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  serviceTypeIndicator: {
    width: 4,
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  serviceAddress: {
    fontSize: 12,
    color: "#888",
    marginBottom: 1,
  },
  servicePhone: {
    fontSize: 12,
    color: "#3498db",
    fontWeight: "500",
  },
});
