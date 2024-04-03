import { Stack } from "expo-router";

export default function LayoutProfile() {
  return (
    <Stack initialRouteName="profile">
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="account" options={{ title: "Account" }} />
    </Stack>
  );
}
