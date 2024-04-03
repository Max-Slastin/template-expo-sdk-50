import { StyleSheet } from "react-native";

import { Text } from "../ui";

export const ErrorText = ({ text = "" }) => {
  return text?.length ? <Text style={styles.container}>{text}</Text> : null;
};

const styles = StyleSheet.create({
  container: {
    color: "red",
    padding: 8,
  },
});
