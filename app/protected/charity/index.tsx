import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CharityServicesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Updated charity services data
  const charityServices = [
    {
      id: "1",
      name: "Financial",
      description: "Identify and request financial support",
      icon: "cash",
    },
    {
      id: "2",
      name: "Clothing",
      description: "Identify and request available clothing support",
      icon: "shirt",
    },
    {
      id: "3",
      name: "Education",
      description: "Identify and request educational donations",
      icon: "school",
    },
    {
      id: "4",
      name: "Counseling/Personal Services",
      description: "Identify and request counseling services",
      icon: "people",
    },
    {
      id: "5",
      name: "Information Technology",
      description: "Identify and request IT services and products",
      icon: "laptop",
    },
    {
      id: "6",
      name: "Health Care/Food",
      description: "Identify and request health care and food services",
      icon: "medkit",
    },
  ];

  // Sample charities data
  const charities = [
    {
      id: "1",
      name: "Veterans Support Foundation",
      category: "Financial",
      description: "Provides financial assistance to veterans in need",
      location: "Washington, DC",
    },
    {
      id: "2",
      name: "Military Clothing Relief",
      category: "Clothing",
      description: "Donates clothing to military families",
      location: "San Diego, CA",
    },
    {
      id: "3",
      name: "Veterans Education Fund",
      category: "Education",
      description: "Scholarships for veterans pursuing higher education",
      location: "Boston, MA",
    },
    {
      id: "4",
      name: "Warrior Wellness Center",
      category: "Counseling/Personal Services",
      description: "Mental health services for veterans and their families",
      location: "Austin, TX",
    },
    {
      id: "5",
      name: "Tech for Troops",
      category: "Information Technology",
      description: "Provides computers and IT training to veterans",
      location: "Richmond, VA",
    },
    {
      id: "6",
      name: "Healthy Heroes",
      category: "Health Care/Food",
      description: "Free health screenings and food assistance",
      location: "Chicago, IL",
    },
    {
      id: "7",
      name: "Veterans Financial Coalition",
      category: "Financial",
      description: "Financial literacy and emergency assistance",
      location: "New York, NY",
    },
    {
      id: "8",
      name: "Operation Educate",
      category: "Education",
      description: "Educational resources and tutoring for veterans",
      location: "Atlanta, GA",
    },
  ];

  // Filter charities based on search query
  const filteredCharities = charities.filter(
    (charity) =>
      charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Categories section */}
      <View style={styles.servicesGrid}>
        {charityServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => {
              setSearchQuery(service.name);
              // router.push(`/protected/charity/${service.id}`);
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
          placeholder="Search charities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Charities list */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Available Charities</Text>
        {filteredCharities.length === 0 ? (
          <Text style={styles.noResults}>
            No charities found matching your search.
          </Text>
        ) : (
          filteredCharities.map((charity) => (
            <TouchableOpacity
              key={charity.id}
              style={styles.charityCard}
              onPress={() =>
                router.push(`/protected/charity/details/${charity.id}`)
              }
            >
              <View style={styles.charityHeader}>
                <Text style={styles.charityName}>{charity.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{charity.category}</Text>
                </View>
              </View>
              <Text style={styles.charityDescription}>
                {charity.description}
              </Text>
              <View style={styles.charityFooter}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.charityLocation}>{charity.location}</Text>
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
  serviceDescription: {
    fontSize: 12,
    color: "#666",
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
  charityCard: {
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
  charityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  charityName: {
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
  charityDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  charityFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  charityLocation: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});
