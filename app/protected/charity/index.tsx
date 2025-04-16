import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
// Fix the Auth import for Amplify v6
import { signOut as amplifySignOut, getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../../styles/globalStyles"; // Updated import path

function CharitiesScreen({
  signOut: authSignOut,
  user: authUser,
}: {
  signOut?: () => Promise<void>;
  user?: any;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample charity data
  const charities = [
    {
      id: "1",
      name: "Wounded Warrior Project",
      type: "Veteran Support",
      image: "https://via.placeholder.com/100",
      description:
        "Providing programs and services to severely injured service members during the time between active duty and transition to civilian life.",
    },
    {
      id: "2",
      name: "Disabled American Veterans",
      type: "Advocacy & Benefits",
      image: "https://via.placeholder.com/100",
      description:
        "Providing free, professional assistance to veterans of all generations in obtaining VA and other government benefits.",
    },
    {
      id: "3",
      name: "Fisher House Foundation",
      type: "Family Support",
      image: "https://via.placeholder.com/100",
      description:
        "Providing comfort homes where military & veterans families can stay at no cost while a loved one is receiving treatment.",
    },
    {
      id: "4",
      name: "Gary Sinise Foundation",
      type: "Multiple Programs",
      image: "https://via.placeholder.com/100",
      description:
        "Serving our nation by honoring our defenders, veterans, first responders, their families, and those in need.",
    },
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        // If user is passed from withAuthenticator, use it
        if (authUser) {
          setUser(authUser as any);
        } else {
          // Otherwise fetch the current user manually
          const userData = await getCurrentUser();
          setUser(userData as any);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // If we can't get the user, redirect to home
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [authUser, router]);

  const handleSignOut = async () => {
    try {
      if (authSignOut) {
        await authSignOut();
      } else {
        await amplifySignOut();
      }
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigateToCharity = (charityId: string) => {
    router.push(`/protected/charity/details/${charityId}`);
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>Loading charities content...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>
          Authentication required. Redirecting...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Charities Page</Text>
        <Text style={globalStyles.subtitle}>
          Welcome, {user.signInDetails?.loginId || "User"}
        </Text>
        <Text style={globalStyles.content}>
          Below are veteran-focused charities for you to explore
        </Text>

        {/* Charity List */}
        <View style={styles.charitiesContainer}>
          {charities.map((charity) => (
            <TouchableOpacity
              key={charity.id}
              style={styles.charityCard}
              onPress={() => navigateToCharity(charity.id)}
            >
              <Image
                source={{ uri: charity.image }}
                style={styles.charityImage}
              />
              <View style={styles.charityInfo}>
                <Text style={styles.charityName}>{charity.name}</Text>
                <Text style={styles.charityType}>{charity.type}</Text>
                <Text style={styles.viewMore}>View Details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Sign Out" onPress={handleSignOut} />
          <Button
            title="Back to Home"
            onPress={() => router.back()}
            color="#666"
          />
        </View>
      </View>
    </ScrollView>
  );
} // Keep the specific styles needed for this page
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#13345c", // Match the global container background
  },
  charitiesContainer: {
    width: "100%",
    marginBottom: 30,
  },
  charityCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  charityImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  charityInfo: {
    flex: 1,
    justifyContent: "center",
  },
  charityName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Dark text for light background cards
  },
  charityType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  viewMore: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});

export default withAuthenticator(CharitiesScreen);
