import { Text, View } from "react-native";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { globalStyles } from "../../styles/globalStyles"; // Import global styles

function ProfileScreen({ user: authUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        // If user is passed from withAuthenticator, use it
        if (authUser) {
          setUser(authUser);
        } else {
          // Otherwise fetch the current user manually
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [authUser]);

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>Loading user profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.content}>
          Unable to load user profile. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>User Profile</Text>
      <Text style={globalStyles.content}>
        Email: {user.signInDetails?.loginId || "N/A"}
        <br />
        this is a PROTECTED ROUTE
      </Text>
      {/* Display more user information here */}
    </View>
  );
}

export default withAuthenticator(ProfileScreen);
