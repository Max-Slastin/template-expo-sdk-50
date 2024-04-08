import { getSession } from "../auth/auth";
import { SupabaseRequestStatus, SupabaseResult, supabase } from "../supabase";

export type TProfileData = {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
};

export const getProfile = async (): Promise<SupabaseResult | null> => {
  try {
    const session = await getSession();

    const { data, error, status } = await supabase
      .from("profiles")
      .select("first_name, last_name, phone_number")
      .eq("id", session?.user.id)
      .single();
    if (error && status !== 406) {
      return { status: SupabaseRequestStatus.Error, error: error.message };
    }

    if (data) {
      const newData: TProfileData = {
        firstName: data.first_name,
        lastName: data.last_name,
        phoneNumber: data.phone_number,
      };
      return { status: SupabaseRequestStatus.Ok, data: newData };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: SupabaseRequestStatus.Error, error: error.message };
    }
  }

  return null;
};

export const updateProfile = async (
  data: TProfileData,
): Promise<SupabaseResult | null> => {
  try {
    const session = await getSession();

    const updates = {
      id: session?.user.id,
      updated_at: new Date(),
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      return { status: SupabaseRequestStatus.Error, error: error.message };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: SupabaseRequestStatus.Error, error: error.message };
    }
  }

  return null;
};
