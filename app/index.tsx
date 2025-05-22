import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const [activeInitiative, setActiveInitiative] = useState(0);
  const initiativeRef = useRef(null);

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

  // Initiatives data
  const initiatives = [
    {
      id: "1",
      title: "Cellphones For Soldiers Mobile",
      description:
        "Providing veterans with a free phone and a year of paid phone service.",
      icon: "phone-portrait-outline",
      color: "#3498db",
      url: "https://www.cellphonesforsoldiers.com/mobile/",
    },
    {
      id: "2",
      title: "Helping Heroes Home",
      description:
        "Providing financial assistance to military members and veterans in times of crisis or need.",
      icon: "home-outline",
      color: "#e74c3c",
      url: "https://www.cellphonesforsoldiers.com/veterans-aid-helping-heroes-home/",
    },
    {
      id: "3",
      title: "Minutes That Matter",
      description:
        "Connecting deployed personnel with their loved ones by providing international calling cards.",
      icon: "time-outline",
      color: "#2ecc71",
      url: "https://www.cellphonesforsoldiers.com/minutes-that-matter/",
    },
    {
      id: "4",
      title: "Environmental Impact",
      description:
        "Reducing electronic waste and its impact on the environment through cell phone recycling.",
      icon: "leaf-outline",
      color: "#f39c12",
      url: "", // Add URL when available
    },
  ];

  // Auto-scroll the initiatives carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (initiativeRef.current) {
        const nextIndex = (activeInitiative + 1) % initiatives.length;

        // For web compatibility, use scrollTo with calculated offset instead of scrollToIndex
        const offset = nextIndex * (Dimensions.get("window").width - 40 + 20); // card width + margin

        try {
          initiativeRef.current.scrollToOffset({
            offset,
            animated: true,
          });
          setActiveInitiative(nextIndex);
        } catch (error) {
          console.log("Scroll error:", error);
        }
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [activeInitiative]);

  const handleOpenLink = (url) => {
    if (!url) return;

    if (Platform.OS === "web") {
      // For web, open in a new tab
      window.open(url, "_blank");
    } else {
      // For mobile, open in device browser
      Linking.openURL(url);
    }
  };

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

        <View style={styles.cpfsContainer}>
          <View style={styles.cpfsContent}>
            <View style={styles.cpfsTextContainer}>
              <Text style={styles.cpfsSectionTitle}>
                What is Cell Phones For Soldiers?
              </Text>
              <Text style={styles.cpfsDescription}>
                Cell Phones For Soldiers is a national non-profit organization
                dedicated to providing cost-free communication services and
                emergency funding to active-duty military members and veterans.
              </Text>
            </View>
            <View style={styles.cpfsImageContainer}>
              <Image
                source={require("../assets/images/Four_Color_Logo-300x300.webp")}
                style={styles.cpfsLogo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Our Initiatives Section */}
        <View style={styles.initiativesContainer}>
          <Text style={styles.initiativesSectionTitle}>Our Initiatives</Text>
          <Text style={styles.initiativesSubtext}>
            Making a difference through various programs and initiatives. Our
            newest initiative, CellPhones For Soldiers Mobile, provides veterans
            with free phones and services to help bridge the gap and keep them
            connected.
          </Text>

          {/* Initiatives Carousel */}
          <View style={styles.carouselContainer}>
            {/* Navigation Buttons */}
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonLeft]}
              onPress={() => {
                setActiveInitiative((current) =>
                  current === 0 ? initiatives.length - 1 : current - 1
                );
              }}
            >
              <Ionicons name="chevron-back" size={24} color="#13345c" />
            </TouchableOpacity>

            {/* Current Initiative Card */}
            <TouchableOpacity
              style={[
                styles.initiativeCard,
                initiatives[activeInitiative].url
                  ? styles.initiativeCardClickable
                  : null,
              ]}
              onPress={() => handleOpenLink(initiatives[activeInitiative].url)}
              disabled={!initiatives[activeInitiative].url}
            >
              <View
                style={[
                  styles.initiativeIconContainer,
                  { backgroundColor: initiatives[activeInitiative].color },
                ]}
              >
                <Ionicons
                  name={initiatives[activeInitiative].icon}
                  size={40}
                  color="white"
                />
              </View>
              <Text style={styles.initiativeTitle}>
                {initiatives[activeInitiative].title}
              </Text>
              <Text style={styles.initiativeDescription}>
                {initiatives[activeInitiative].description}
              </Text>

              {initiatives[activeInitiative].url && (
                <View style={styles.learnMoreContainer}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                  <Ionicons name="arrow-forward" size={16} color="#3498db" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, styles.navButtonRight]}
              onPress={() => {
                setActiveInitiative(
                  (current) => (current + 1) % initiatives.length
                );
              }}
            >
              <Ionicons name="chevron-forward" size={24} color="#13345c" />
            </TouchableOpacity>
          </View>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {initiatives.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveInitiative(index)}
                style={[
                  styles.paginationDot,
                  index === activeInitiative && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
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
  cpfsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
  },
  cpfsContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 1200,
    marginHorizontal: "auto",
  },
  cpfsTextContainer: {
    flex: 1,
    paddingRight: 20,
  },
  cpfsSectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 16,
  },
  cpfsDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  cpfsImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cpfsLogo: {
    width: 250,
    height: 250,
  },

  // Our Initiatives Section Styles
  initiativesContainer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  initiativesSectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 16,
    textAlign: "center",
  },
  initiativesSubtext: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 800,
  },
  initiativesCarousel: {
    paddingVertical: 10,
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
    position: "relative",
  },
  initiativeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    width: "80%",
    maxWidth: 500,
    minHeight: 250,
    justifyContent: "center",
  },
  initiativeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  initiativeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 12,
    textAlign: "center",
  },
  initiativeDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },
  navButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  navButtonLeft: {
    marginRight: -20,
  },
  navButtonRight: {
    marginLeft: -20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#13345c",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  initiativeCardClickable: {
    cursor: "pointer",
    borderColor: "#3498db",
    borderWidth: 1,
  },
  learnMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  learnMoreText: {
    color: "#3498db",
    fontWeight: "bold",
    marginRight: 5,
  },
});
