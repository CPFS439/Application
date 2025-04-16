import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser, signOut } from "aws-amplify/auth";

const MenuScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        if (isMounted) {
          setIsAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: async () => {
          try {
            await signOut();
            setIsAuthenticated(false);
            router.replace("/");
          } catch (error) {
            console.error("Error signing out:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
          }
        },
      },
    ]);
  };

  // Common menu items for all users
  const commonMenuItems = [
    { title: "Settings", icon: "settings-outline", route: "/settings" },
    { title: "Help & Support", icon: "help-circle-outline", route: "/help" },
    { title: "About Us", icon: "information-circle-outline", route: "/about" },
    {
      title: "Terms & Conditions",
      icon: "document-text-outline",
      route: "/terms",
    },
    { title: "Privacy Policy", icon: "shield-outline", route: "/privacy" },
    { title: "Contact Us", icon: "mail-outline", route: "/contact" },
  ];

  // Authenticated-only menu items
  const authenticatedMenuItems = [
    {
      title: "My Account",
      icon: "person-circle-outline",
      route: "/protected/profile",
    },
    { title: "My Orders", icon: "receipt-outline", route: "/protected/orders" },
    {
      title: "Saved Items",
      icon: "bookmark-outline",
      route: "/protected/saved",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User-specific section */}
      {isAuthenticated && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Account</Text>
          {authenticatedMenuItems.map((item, index) => (
            <TouchableOpacity
              key={`auth-${index}`}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <Ionicons name={item.icon} size={24} color="#13345c" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#13345c"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Common menu items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        {commonMenuItems.map((item, index) => (
          <TouchableOpacity
            key={`common-${index}`}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="#13345c" />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#13345c"
              style={styles.chevron}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out button - only shown when authenticated */}
      {isAuthenticated && (
        <View style={styles.signOutSection}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={24} color="#fff" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    paddingBottom: 80, // Add padding at the bottom for the bottom nav bar
  },
  section: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#13345c",
    flex: 1,
  },
  chevron: {
    marginLeft: "auto",
  },
  signOutSection: {
    margin: 16,
    marginTop: 8,
    marginBottom: 80,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d23631",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default MenuScreen;
