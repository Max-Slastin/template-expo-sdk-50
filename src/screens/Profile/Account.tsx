import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

import { UserForm } from "@components/common";
import { Button } from "@components/ui";
import {
  TProfileData,
  getProfile,
  updateProfile,
} from "@services/profile/profile";
import { SupabaseRequestStatus } from "@services/supabase";

export const Account = () => {
  const navigator = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [formDate, setFormDate] = useState<TProfileData | null>();

  const onChangeUserForm = (data: TProfileData) => {
    setFormDate(data);
  };

  const update = async () => {
    if (formDate) {
      await updateProfile(formDate);
    }

    navigator.goBack();
  };

  useEffect(() => {
    const profile = async () => {
      const profileResult = await getProfile();
      if (profileResult?.status === SupabaseRequestStatus.Ok) {
        setFormDate(profileResult.data);
      }
      setLoading(false);
    };
    profile();
  }, []);

  return (
    <>
      <UserForm
        firstName={formDate?.firstName || ""}
        lastName={formDate?.lastName || ""}
        phoneNumber={formDate?.phoneNumber || ""}
        onChangeText={onChangeUserForm}
      />

      <Button disabled={loading} onPress={update}>
        Update profile
      </Button>
    </>
  );
};
