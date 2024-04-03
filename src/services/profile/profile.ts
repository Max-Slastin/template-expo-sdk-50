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
      .select("firstName, lastName, phoneNumber")
      .eq("id", session?.user.id)
      .single();
    if (error && status !== 406) {
      return { status: SupabaseRequestStatus.Error, error: error.message };
    }

    if (data) {
      return { status: SupabaseRequestStatus.Ok, data };
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
      updatedAt: new Date(),
      ...data,
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
