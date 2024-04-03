import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import {
  EmailInput,
  ErrorText,
  PasswordInput,
  UserForm,
} from "@components/common";
import { FormTypes } from "@components/common/types";
import { singUp } from "@services/auth/auth";
import { Button } from "@components/ui";
import { TProfileData, updateProfile } from "@services/profile/profile";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [error, setError] = useState("");

  const [formDateUser, setFormDate] = useState<TProfileData | null>();

  const onChangeUserForm = (data: TProfileData) => {
    setFormDate(data);
  };

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await singUp({ email, password });

    if (error) {
      setError(error);
    } else {
      if (formDateUser) {
        updateProfile(formDateUser);
      }
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
  const goToSignIn = () => navigator.navigate("sign-in" as never);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <EmailInput email={email} onChangeText={onChangeText} />
      </View>

      <View style={styles.verticallySpaced}>
        <PasswordInput password={password} onChangeText={onChangeText} />
      </View>

      <ErrorText text={error} />

      <UserForm
        firstName={formDateUser?.firstName || ""}
        lastName={formDateUser?.lastName || ""}
        phoneNumber={formDateUser?.phoneNumber || ""}
        onChangeText={onChangeUserForm}
      />

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading || !isValidForm} onPress={signUpWithEmail}>
          Sign up
        </Button>
      </View>

      <Button disabled={loading} onPress={goToSignIn}>
        Sign in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingVertical: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
