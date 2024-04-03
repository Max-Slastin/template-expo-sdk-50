import { useState } from "react";

import { ErrorText } from "./ErrorText";
import { FormTypes } from "./types";
import { passwordValidator } from "../../utils/validator";
import { Input } from "../ui";

type PasswordInputProps = {
  password?: string;
  onChangeText: (password: string, type: FormTypes, isValid: boolean) => void;
};

export const PasswordInput = ({
  password = "",
  onChangeText,
}: PasswordInputProps) => {
  const [error, setError] = useState(password);

  const validator = (text: string) => {
    const errorText = passwordValidator(text);
    setError(errorText);
    onChangeText(text, FormTypes.Password, Boolean(!errorText?.length));
  };

  return (
    <>
      <Input
        label="Password"
        onChangeText={validator}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
      />

      <ErrorText text={error} />
    </>
  );
};
