import { Text as TextPaper, TextProps } from "react-native-paper";

export const Text = (props: TextProps) => {
  return <TextPaper {...props}>{props.children}</TextPaper>;
};
