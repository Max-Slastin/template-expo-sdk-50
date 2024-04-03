import { useState } from "react";

import { ErrorText } from "./ErrorText";
import { FormTypes } from "./types";
import { emailValidator } from "../../utils/validator";
import { Input } from "../ui";

type EmailInputProps = {
  email?: string;
  onChangeText: (email: string, type: FormTypes, isValid: boolean) => void;
};

export const EmailInput = ({ email, onChangeText }: EmailInputProps) => {
  const [error, setError] = useState(email);

  const validator = (text: string) => {
    const errorText = emailValidator(text);
    setError(errorText);

    onChangeText(text, FormTypes.Email, Boolean(!errorText?.length));
  };

  return (
    <>
      <Input
        label="Email"
        onChangeText={validator}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />

      <ErrorText text={error} />
    </>
  );
};
