import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription.remove();
  }, []);

  // Calculate responsive font sizes based on screen width
  const getFontSizes = () => {
    const baseWidth = 375; // Base width (iPhone X)
    const scaleFactor = Math.min(screenDimensions.width / baseWidth, 1.5); // Cap scaling at 1.5x

    return {
      missionTitle: Math.round(28 * scaleFactor),
      missionText: Math.round(15 * scaleFactor), // Reduced from 16 to 15 to make it less emphasized
    };
  };

  const fontSizes = getFontSizes();

  // Calculate positions for layout
  const heroHeight = (screenDimensions.width * 9) / 16;
  const gapSize = 33; // 33 pixel gap between hero and mission

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Hero Image Section */}
        <View style={[styles.heroContainer, { width: screenDimensions.width }]}>
          <Image
            source={require("../assets/images/splash-image.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Gap between hero and mission (invisible spacer) */}
        <View style={{ height: gapSize }} />

        {/* Floating Text section - positioned in the middle of the gap */}
        <View
          style={[
            styles.floatingTextContainer,
            {
              top: heroHeight - 40, // Position to anchor in the middle of the gap
            },
          ]}
        >
          <View style={styles.textContent}>
            <Text style={styles.title}>
              Cellphones For Soldiers Marketplace
            </Text>
            <Text style={styles.subtitle}>
              A lifeline for America's bravest
            </Text>
          </View>
        </View>

        {/* Our Mission Section - positioned after the gap */}
        <View
          style={[
            styles.missionContainer,
            {
              width: screenDimensions.width * 0.95,
            },
          ]}
        >
          <ImageBackground
            source={require("../assets/images/OurMission.png")}
            style={styles.missionBackground}
            imageStyle={styles.missionBackgroundImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.missionGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />

            {/* Mission Text Container */}
            <View style={styles.missionTextContainer}>
              <Text
                style={[
                  styles.missionTitle,
                  { fontSize: fontSizes.missionTitle, color: "white" }, // Changed back to white
                ]}
              >
                Our Mission
              </Text>
              <Text
                style={[
                  styles.missionText,
                  {
                    fontSize: fontSizes.missionText,
                    opacity: 0.9, // Reduced opacity to make it less emphasized
                  },
                ]}
              >
                Connect Veterans to cost-free services, emergency funding, and
                publicly available resources across thousands of charity
                services and processes. Cell Phones For Soldiers application
                allows veterans to access and submit for veteran services within
                3 clicks or less.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* You can add more content below here */}
        <View style={styles.emptySpace}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  contentContainer: {
    alignItems: "center",
    position: "relative",
  },
  heroContainer: {
    aspectRatio: 16 / 9,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  floatingTextContainer: {
    position: "absolute",
    width: "85%",
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  textContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
  },

  // Our Mission Section Styles
  missionContainer: {
    aspectRatio: 16 / 9,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  missionBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  missionBackgroundImage: {
    borderRadius: 10,
  },
  missionGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
  },
  missionTextContainer: {
    padding: 20,
    width: "100%",
    zIndex: 2,
    maxWidth: 800,
  },
  missionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
    // Color is now set inline back to white
  },
  missionText: {
    color: "white",
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    paddingHorizontal: "5%",
    // Opacity is now set inline to make it less emphasized
  },
  emptySpace: {
    height: 100,
  },
});
