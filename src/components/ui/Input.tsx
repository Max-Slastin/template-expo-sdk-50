import { TextInput, TextInputProps } from "react-native-paper";

export const Input = (props: TextInputProps) => {
  return <TextInput {...props}>{props.children}</TextInput>;
};
