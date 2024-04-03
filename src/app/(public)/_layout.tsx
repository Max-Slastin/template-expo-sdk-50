import { useEffect } from "react";
import { Stack, useNavigation } from "expo-router";

import { isLogin } from "@services/auth/auth";

export default function LayoutPublic() {
  const navigator = useNavigation();

  useEffect(() => {
    console.log("app public loading");

    const goToPrivat = async () => {
      if (await isLogin()) {
        return navigator.navigate("(privat)" as never);
      }
    };

    goToPrivat();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ header: () => null }} />
      <Stack.Screen name="sign-up" options={{ header: () => null }} />
    </Stack>
  );
}
