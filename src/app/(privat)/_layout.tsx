import { useEffect } from "react";
import { Tabs, useNavigation } from "expo-router";

import { isLogin } from "@services/auth/auth";

export default function LayoutPrivat() {
  const navigator = useNavigation();

  useEffect(() => {
    console.log("app privat loading");

    const goToPublic = async () => {
      if (!(await isLogin())) {
        return navigator.navigate("(public)" as never);
      }
    };

    goToPublic();
  }, []);

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "blue" }}
      initialRouteName="(profile)"
    >
      <Tabs.Screen
        name="(profile)"
        options={{ title: "Profile", header: () => null }}
      />
      <Tabs.Screen name="notifications" options={{ title: "Notifications" }} />
    </Tabs>
  );
}
