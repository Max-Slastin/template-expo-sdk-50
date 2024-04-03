import { useEffect, useState } from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Slot, useNavigation, useSegments } from "expo-router";

import { isLogin } from "@services/auth/auth";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function LayoutApp() {
  const segments = useSegments();

  const [loading, setLoading] = useState<boolean>(true);
  const navigator = useNavigation();

  useEffect(() => {
    if (loading) {
      setLoading(true);
      //Lading and get props project
      console.log("app layout loading");

      const goToPrivat = async () => {
        if (await isLogin()) {
          return navigator.navigate("(privat)" as never);
        }
      };

      goToPrivat();

      setLoading(false);
    }
  }, [loading]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {segments.includes("(privat)") ? (
          <Slot
            initialRouteName="(profile)"
            screenOptions={{ navigation: "(privat)" }}
          />
        ) : (
          <Slot
            initialRouteName="sign-in"
            screenOptions={{ navigation: "(public)" }}
          />
        )}
        <StatusBar />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
