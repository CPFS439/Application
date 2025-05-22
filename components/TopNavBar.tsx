import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";
import { Ionicons } from "@expo/vector-icons";

const TopNavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status
  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Determine screen title based on pathname
  const getScreenTitle = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/menu") return "Menu";
    if (pathname.includes("/protected/charity")) return "Charity Services";
    if (pathname.includes("/protected/retail"))
      return "Cell Phones For Soldiers Services";
    if (pathname.includes("/protected/profile")) return "Profile";

    return "CFS Marketplace";
  };

  // Check if we're on the profile page
  const isProfilePage = pathname.includes("/protected/profile");

  // Apply different background color only for profile page
  const navbarStyle = [
    styles.container,
    isProfilePage && { backgroundColor: "#fff" },
  ];

  return (
    <View style={navbarStyle}>
      {/* Logo button - replaced home icon with circular image */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/")}
      >
        <Image
          source={require("../assets/images/placeholderlogo.png")}
          style={styles.logoImage}
        />
      </TouchableOpacity>

      {/* Screen Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{getScreenTitle()}</Text>
      </View>

      {/* Profile/Sign In button */}
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          if (isAuthenticated) {
            router.push("/protected/profile");
          } else {
            router.push("/protected");
          }
        }}
      >
        <Ionicons
          name="person-circle"
          size={28}
          color={isAuthenticated ? "#3498db" : "#13345c"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    width: "100%",
    zIndex: 1000,
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // Make the image circular
    borderWidth: 1,
    borderColor: "#3498db",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#13345c",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopNavBar;
