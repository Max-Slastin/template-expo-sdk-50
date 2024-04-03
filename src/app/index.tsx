import { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "expo-router";

import { Text } from "@components/ui";

export default function Page() {
  const navigator = useNavigation();
  useEffect(() => {
    return navigator.navigate("(public)" as never);
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
