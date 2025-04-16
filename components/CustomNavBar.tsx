import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Svg, Circle } from "react-native-svg";
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
    path: "/" | "/protected/charity" | "/protected/profile"
  ) => {
    router.push(path);
  };

  // Determine if a tab is active
  const isActive = (path: string) => {
    // If we're authenticating, ONLY the sign-in tab should be active
    if (isAuthenticating) {
      return path === "/protected";
    }

    // Normal active tab logic for authenticated users
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && path !== "/protected" && pathname.includes(path))
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

      {/* Charities Tab */}
      <TouchableOpacity
        style={[styles.tab, isActive("/protected/charity") && styles.activeTab]}
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
            isActive("/protected/charity") && styles.activeTabText,
          ]}
        >
          Charities
        </Text>
      </TouchableOpacity>

      {/* Logo in the middle */}
      <TouchableOpacity
        style={styles.logoTab}
        onPress={() => {
          if (isAuthenticated) {
            navigateTo("/protected/profile");
          } else {
            navigateTo("/");
          }
        }}
      >
        <View style={styles.logoContainer}>
          <Svg height="40" width="40" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="45" fill="#3498db" />
          </Svg>
        </View>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={[styles.tab, isActive("/protected/profile") && styles.activeTab]}
        onPress={() => {
          if (isAuthenticated) {
            navigateTo("/protected/profile");
          } else {
            navigateTo("/protected");
          }
        }}
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

      {/* Sign In/Out Tab */}
      {isAuthenticated ? (
        <TouchableOpacity style={styles.tab} onPress={handleSignOut}>
          <Ionicons name="log-out" size={24} color="#d23631" />
          <Text style={[styles.tabText, { color: "#d23631" }]}>Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.tab, isActive("/protected") && styles.activeTab]}
          onPress={() => navigateTo("/protected")}
        >
          <Ionicons
            name="log-in"
            size={24}
            color={isActive("/protected") ? "#3498db" : "#13345c"}
          />
          <Text
            style={[
              styles.tabText,
              isActive("/protected") && styles.activeTabText,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      )}
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
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: "#3498db",
  },
  tabText: {
    fontSize: 12,
    color: "#13345c",
    marginTop: 2,
  },
  activeTabText: {
    color: "#3498db",
    fontWeight: "bold",
  },
  logoTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default CustomNavBar;
