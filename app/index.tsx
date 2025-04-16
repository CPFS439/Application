import { StatusBar, Text, View, Button } from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);
import { Link } from "expo-router";
import { globalStyles } from "../styles/globalStyles"; // Import global styles

export default function Index() {
  return (
    <View style={[globalStyles.container, { paddingBottom: 70 }]}>
      <Text style={globalStyles.title}>Welcome to CFS Marketplace</Text>
      <Text style={globalStyles.subtitle}>This is a PUBLIC ROUTE</Text>

      <Link href="/protected/charity" asChild>
        <Button title="Go to Charities" />
      </Link>

      <StatusBar />
    </View>
  );
}
