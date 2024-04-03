import { StyleSheet } from "react-native";

import { TProfileData } from "../../services/profile/profile";
import { Input } from "../ui";

type UserFormProps = {
  onChangeText: (formData: TProfileData) => void;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

export const UserForm = ({
  firstName = "",
  lastName = "",
  phoneNumber = "",
  onChangeText,
}: UserFormProps) => {
  const onChangeFirstName = (firstName: string) => {
    onChangeText({ firstName, lastName, phoneNumber });
  };

  const onChangeLastName = (lastName: string) => {
    onChangeText({ firstName, lastName, phoneNumber });
  };

  const onChangePhoneNumber = (phoneNumber: string) => {
    onChangeText({ firstName, lastName, phoneNumber });
  };

  return (
    <>
      <Input
        style={styles.verticallySpaced}
        label="First name"
        onChangeText={onChangeFirstName}
        value={firstName}
        autoCapitalize="none"
      />

      <Input
        style={styles.verticallySpaced}
        label="Last name"
        onChangeText={onChangeLastName}
        value={lastName}
        autoCapitalize="none"
      />

      <Input
        style={styles.verticallySpaced}
        label="Phone number"
        onChangeText={onChangePhoneNumber}
        value={phoneNumber}
        autoCapitalize="none"
      />
    </>
  );
};

const styles = StyleSheet.create({
  verticallySpaced: {
    alignSelf: "stretch",
    marginVertical: 4,
  },
});
