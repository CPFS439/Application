import React, { useState, useRef, useEffect } from "react";
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
import vsoOfficesData from "../../data/vso-offices.json";
import cpfsDropOffData from "../../data/cpfs-drop-off-locations.json";
import homelessSheltersData from "../../data/homeless-shelters.json";

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

  // All veteran services with different types
  const [veteranServices, setVeteranServices] = useState<Service[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Combine all service data (all coordinates are now pre-loaded in JSON files)
  useEffect(() => {
    const services: Service[] = [];
    
    // Add VSO offices (all have coordinates now)
    vsoOfficesData.forEach((office, index) => {
      if ((office as any).coordinates) {
        services.push({
          id: index + 1,
          title: `${office.county} County VSO`,
          description: `Veterans Service Office - ${office.director}`,
          latitude: (office as any).coordinates[0],
          longitude: (office as any).coordinates[1],
          type: "vso_office",
          address: office.address,
          phone: office.workPhone,
        });
      }
    });

    // Add CPFS Drop-off locations (already have coordinates)
    cpfsDropOffData.forEach((location, index) => {
      services.push({
        id: 100 + index,
        title: location.name,
        description: "Cell Phones For Soldiers Drop-off Location",
        latitude: location.coordinates[0],
        longitude: location.coordinates[1],
        type: "cpfs_dropoff",
        address: `${location.address}, ${location.cityStateZip}`,
        phone: location.phone,
      });
    });

    // Add Homeless Shelters (all have coordinates now)
    homelessSheltersData.forEach((shelter, index) => {
      if ((shelter as any).coordinates) {
        services.push({
          id: 200 + index,
          title: shelter.name,
          description: shelter.services,
          latitude: (shelter as any).coordinates[0],
          longitude: (shelter as any).coordinates[1],
          type: "homeless_shelter",
          address: `${shelter.address}, ${shelter.city}, ${shelter.state} ${shelter.zipCode}`,
          phone: shelter.phone,
        });
      }
    });
    
    setVeteranServices(services);
  }, []);

  const handleServiceLocationPress = (service: Service) => {
    // Zoom map to this location and open info window
    if (mapComponentRef.current && mapComponentRef.current.zoomToLocationAndShowInfo) {
      mapComponentRef.current.zoomToLocationAndShowInfo(
        service.latitude,
        service.longitude
      );
    }
  };

  // Filter services based on selected filter
  const filteredServices = selectedFilter === "all" 
    ? veteranServices 
    : veteranServices.filter(service => service.type === selectedFilter);

  // Convert filtered services to map locations format
  const mapLocations = filteredServices.map((service) => ({
    latitude: service.latitude,
    longitude: service.longitude,
    title: service.title,
    description: service.description,
    address: service.address,
    phone: service.phone,
    type: service.type,
  }));

  const filterOptions = [
    { key: "all", label: "All Services", icon: "🔍", color: "#95a5a6" },
    { key: "vso_office", label: "VSO Offices", icon: "🏢", color: "#2ecc71" },
    { key: "cpfs_dropoff", label: "CPFS Drop-offs", icon: "📱", color: "#3498db" },
    { key: "homeless_shelter", label: "Homeless Shelters", icon: "🏠", color: "#e74c3c" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Veteran Services & Support</Text>
        <Text style={styles.subHeaderText}>
          Find veteran services, support centers, and drop-off locations
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapComponent
          ref={mapComponentRef}
          locations={mapLocations}
          initialRegion={{
            latitude: 39.8283,
            longitude: -98.5795,
            zoom: 4,
          }}
          onMarkerPress={undefined} // Remove marker press functionality
        />

      </View>

      <ScrollView
        style={styles.bottomSheet}
        contentContainerStyle={styles.bottomSheetContent}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter Services</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
          >
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterButton,
                  selectedFilter === option.key && { backgroundColor: option.color },
                  { borderColor: option.color }
                ]}
                onPress={() => setSelectedFilter(option.key)}
              >
                <Text style={styles.filterEmoji}>{option.icon}</Text>
                <Text style={[
                  styles.filterButtonText,
                  { color: selectedFilter === option.key ? "#fff" : option.color }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>



        <View style={styles.servicesListSection}>
          <Text style={styles.servicesListTitle}>
            Service Locations ({filteredServices.length})
            {selectedFilter !== "all" && (
              <Text style={styles.filterIndicator}>
                {" "}• {filterOptions.find(f => f.key === selectedFilter)?.label}
              </Text>
            )}
          </Text>
          <Text style={styles.servicesListSubtitle}>
            Tap any location to zoom the map
          </Text>
          {filteredServices.map((service) => (
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
                      service.type === "vso_office"
                        ? "#2ecc71"
                        : service.type === "cpfs_dropoff"
                        ? "#3498db"
                        : service.type === "homeless_shelter"
                        ? "#e74c3c"
                        : "#95a5a6",
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
  filterSection: {
    marginBottom: 20,
    paddingBottom: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
  },
  filterScrollView: {
    flexGrow: 0,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: "#fff",
    minWidth: 100,
  },
  filterButtonActive: {
    backgroundColor: "#13345c",
  },
  filterEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  filterIndicator: {
    fontSize: 14,
    color: "#666",
    fontWeight: "normal",
  },

});
