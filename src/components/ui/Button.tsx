import { Button as ButtonPaper, ButtonProps } from "react-native-paper";

export const Button = (props: ButtonProps) => {
  return <ButtonPaper {...props}>{props.children}</ButtonPaper>;
};
