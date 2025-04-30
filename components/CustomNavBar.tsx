import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CustomNavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    } catch (error) {
      setIsAuthenticated(false);

      // If we're on a protected route but not authenticated, we're likely on the auth screen
      if (pathname.startsWith("/protected")) {
        setIsAuthenticating(true);
      } else {
        setIsAuthenticating(false);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigateTo = (
    path:
      | "/"
      | "/protected/charity"
      | "/protected/retail"
      | "/protected/profile"
      | "/menu"
  ) => {
    router.push(path);
  };

  // Determine if a tab is active
  const isActive = (path: string) => {
    // If we're authenticating, ONLY the sign-in tab should be active
    if (isAuthenticating) {
      return path === "/auth";
    }

    // Normal active tab logic for authenticated users
    if (path === "/" && pathname === "/") return true;
    if (path === "/menu" && pathname === "/menu") return true;
    if (
      path !== "/" &&
      path !== "/auth" &&
      path !== "/menu" &&
      pathname.includes(path)
    )
      return true;
    return false;
  };

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={[styles.tab, isActive("/") && styles.activeTab]}
        onPress={() => navigateTo("/")}
      >
        <Ionicons
          name="home"
          size={24}
          color={isActive("/") ? "#3498db" : "#13345c"}
        />
        <Text style={[styles.tabText, isActive("/") && styles.activeTabText]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Charity Services Tab */}
      <TouchableOpacity
        style={[
          styles.tab,
          styles.serviceTab,
          isActive("/protected/charity") && styles.activeTab,
        ]}
        onPress={() => navigateTo("/protected/charity")}
      >
        <Ionicons
          name="heart"
          size={24}
          color={isActive("/protected/charity") ? "#3498db" : "#13345c"}
        />
        <Text
          style={[
            styles.tabText,
            styles.serviceTabText,
            isActive("/protected/charity") && styles.activeTabText,
          ]}
        >
          Charity Services
        </Text>
      </TouchableOpacity>

      {/* Retail Services Tab */}
      <TouchableOpacity
        style={[
          styles.tab,
          styles.serviceTab,
          isActive("/protected/retail") && styles.activeTab,
        ]}
        onPress={() => {
          if (isAuthenticated) {
            navigateTo("/protected/retail");
          } else {
            navigateTo("/auth"); // Updated from "/protected" to "/auth"
          }
        }}
      >
        <Ionicons
          name="cart"
          size={24}
          color={isActive("/protected/retail") ? "#3498db" : "#13345c"}
        />
        <Text
          style={[
            styles.tabText,
            styles.serviceTabText,
            isActive("/protected/retail") && styles.activeTabText,
          ]}
        >
          CPFS Services
        </Text>
      </TouchableOpacity>

      {/* Conditional Tab: Profile when authenticated, Sign In when not */}
      {isAuthenticated ? (
        // Profile Tab (when authenticated)
        <TouchableOpacity
          style={[
            styles.tab,
            isActive("/protected/profile") && styles.activeTab,
          ]}
          onPress={() => navigateTo("/protected/profile")}
        >
          <Ionicons
            name="person"
            size={24}
            color={isActive("/protected/profile") ? "#3498db" : "#13345c"}
          />
          <Text
            style={[
              styles.tabText,
              isActive("/protected/profile") && styles.activeTabText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      ) : (
        // Sign In Tab (when not authenticated) - Updated from "/protected" to "/auth"
        <TouchableOpacity
          style={[styles.tab, isActive("/auth") && styles.activeTab]}
          onPress={() => navigateTo("/auth")}
        >
          <Ionicons
            name="log-in"
            size={24}
            color={isActive("/auth") ? "#3498db" : "#13345c"}
          />
          <Text
            style={[styles.tabText, isActive("/auth") && styles.activeTabText]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      )}

      {/* Menu Tab */}
      <TouchableOpacity
        style={[styles.tab, isActive("/menu") && styles.activeTab]}
        onPress={() => navigateTo("/menu")}
      >
        <Ionicons
          name="menu"
          size={24}
          color={isActive("/menu") ? "#3498db" : "#13345c"}
        />
        <Text
          style={[styles.tabText, isActive("/menu") && styles.activeTabText]}
        >
          Menu
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  serviceTab: {
    flex: 1.2, // Give slightly more space to service tabs
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: "#3498db",
  },
  tabText: {
    fontSize: 12,
    color: "#13345c",
    marginTop: 2,
    textAlign: "center",
  },
  serviceTabText: {
    fontSize: 11, // Slightly smaller font to fit the longer text
    lineHeight: 12,
  },
  activeTabText: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default CustomNavBar;
