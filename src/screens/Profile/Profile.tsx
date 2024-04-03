import { useNavigation } from "expo-router";

import { Button } from "@components/ui";
import { logout } from "@services/auth/auth";

export const Profile = () => {
  const navigator = useNavigation();

  const goToAccount = () => navigator.navigate("account" as never);

  return (
    <>
      <Button onPress={goToAccount}>Account</Button>
      <Button onPress={logout}>Log out</Button>
    </>
  );
};
