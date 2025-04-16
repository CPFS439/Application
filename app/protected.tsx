import { Redirect } from "expo-router";

export default function ProtectedRedirect() {
  return <Redirect href="/protected/charity" />;
}
