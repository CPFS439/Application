import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "OpenSans-Light": OpenSans_300Light,
          "OpenSans-Regular": OpenSans_400Regular,
          "OpenSans-Medium": OpenSans_500Medium,
          "OpenSans-SemiBold": OpenSans_600SemiBold,
          "OpenSans-Bold": OpenSans_700Bold,
          "OpenSans-ExtraBold": OpenSans_800ExtraBold,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
