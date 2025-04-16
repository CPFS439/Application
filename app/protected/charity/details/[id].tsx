import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { globalStyles } from "../../../../styles/globalStyles";
import { withAuthenticator } from "@aws-amplify/ui-react-native";

function CharityDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample charity data - in a real app, you would fetch this from an API
  const charities = {
    "1": {
      id: "1",
      name: "Wounded Warrior Project",
      type: "Veteran Support",
      image: "https://via.placeholder.com/300",
      description:
        "Providing programs and services to severely injured service members during the time between active duty and transition to civilian life.",
      longDescription:
        "The Wounded Warrior Project (WWP) is a charity and veterans service organization that offers a variety of programs, services and events for wounded veterans of the military actions following September 11, 2001. It operates as a nonprofit organization with a mission to 'honor and empower Wounded Warriors' of the United States Armed Forces, as well as provide services and programs for the family members of its registered 'alumni,' as its registered veterans are called.",
      website: "woundedwarriorproject.org",
      founded: "2003",
      headquarters: "Jacksonville, Florida",
    },
    "2": {
      id: "2",
      name: "Disabled American Veterans",
      type: "Advocacy & Benefits",
      image: "https://via.placeholder.com/300",
      description:
        "Providing free, professional assistance to veterans of all generations in obtaining VA and other government benefits.",
      longDescription:
        "DAV (Disabled American Veterans) is an organization created by Congress for disabled veterans of the United States Armed Forces that helps them and their families through various means. It currently has over 1 million members, and was founded to help disabled veterans returning from World War I obtain their benefits.",
      website: "dav.org",
      founded: "1920",
      headquarters: "Cold Spring, Kentucky",
    },
    "3": {
      id: "3",
      name: "Fisher House Foundation",
      type: "Family Support",
      image: "https://via.placeholder.com/300",
      description:
        "Providing comfort homes where military & veterans families can stay at no cost while a loved one is receiving treatment.",
      longDescription:
        "Fisher House Foundation is best known for its network of comfort homes where military and veterans' families can stay at no cost while a loved one is receiving treatment. These homes are located at major military and VA medical centers nationwide, close to the medical center or hospital they serve.",
      website: "fisherhouse.org",
      founded: "1990",
      headquarters: "Rockville, Maryland",
    },
    "4": {
      id: "4",
      name: "Gary Sinise Foundation",
      type: "Multiple Programs",
      image: "https://via.placeholder.com/300",
      description:
        "Serving our nation by honoring our defenders, veterans, first responders, their families, and those in need.",
      longDescription:
        "The Gary Sinise Foundation was established under the philanthropic direction of actor Gary Sinise, who has been an advocate of our nation's defenders for decades. The Foundation's mission is to serve our nation by honoring our defenders, veterans, first responders, their families, and those in need.",
      website: "garysinisefoundation.org",
      founded: "2011",
      headquarters: "Los Angeles, California",
    },
  };

  useEffect(() => {
    // Simulate fetching charity data
    if (id && charities[id]) {
      setCharity(charities[id]);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>Loading charity information...</Text>
      </View>
    );
  }

  if (!charity) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>Charity not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={globalStyles.container}>
        <Image source={{ uri: charity.image }} style={styles.charityImage} />

        <Text style={globalStyles.title}>{charity.name}</Text>
        <Text style={globalStyles.subtitle}>{charity.type}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{charity.longDescription}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Website:</Text>
            <Text style={styles.detailValue}>{charity.website}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Founded:</Text>
            <Text style={styles.detailValue}>{charity.founded}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Headquarters:</Text>
            <Text style={styles.detailValue}>{charity.headquarters}</Text>
          </View>
        </View>

        <Button
          title="Support This Charity"
          color="#3498db"
          onPress={() => {}}
        />
        <Button
          title="Back to Charities"
          onPress={() => router.back()}
          color="#666"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#13345c",
  },
  charityImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  infoSection: {
    width: "100%",
    marginBottom: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: 120,
    color: "#fff",
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    color: "#fff",
  },
});

export default withAuthenticator(CharityDetailScreen);
