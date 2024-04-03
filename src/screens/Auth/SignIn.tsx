import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import { login } from "@services/auth/auth";
import { EmailInput, ErrorText, PasswordInput } from "@components/common";
import { FormTypes } from "@components/common/types";
import { Button } from "@components/ui";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [error, setError] = useState("");

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await login({
      email,
      password,
    });

    if (error) {
      setError(error);
    }
    setLoading(false);
  }

  const onChangeText = (text: string, type: FormTypes, isValid: boolean) => {
    if (type === FormTypes.Email) {
      setEmail(text);
    }

    if (type === FormTypes.Password) {
      setPassword(text);
    }

    setIsValidForm(
      isValid && Boolean(email.length) && Boolean(password.length),
    );

    setError("");
  };

  const navigator = useNavigation();
  const goToSignUp = () => navigator.navigate("sign-up" as never);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <EmailInput email={email} onChangeText={onChangeText} />
      </View>

      <View style={styles.verticallySpaced}>
        <PasswordInput password={password} onChangeText={onChangeText} />
      </View>

      <ErrorText text={error} />

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading || !isValidForm} onPress={signInWithEmail}>
          Sign in
        </Button>

        <Button disabled={loading} onPress={goToSignUp}>
          Sign up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
