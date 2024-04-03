import { router } from "expo-router";
import { AppState } from "react-native";

import { SupabaseRequestStatus, SupabaseResult, supabase } from "../supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

type AuthProps = {
  email: string;
  password: string;
};

export const login = async ({
  email,
  password,
}: AuthProps): Promise<SupabaseResult> => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: SupabaseRequestStatus.Error, error: error.message };
  }

  router.replace("/");

  return { status: SupabaseRequestStatus.Ok };
};

export const singUp = async ({
  email,
  password,
}: AuthProps): Promise<SupabaseResult> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !session)
    return {
      status: SupabaseRequestStatus.Error,
      error:
        error?.message || "Please check your inbox for email verification!",
    };

  router.replace("/");

  return { status: SupabaseRequestStatus.Ok };
};

export const logout = async () => {
  await supabase.auth.signOut();

  router.navigate("/");
};

export const getSession = async () => {
  const sessionResult = await supabase.auth.getSession();
  const session = sessionResult.data.session;
  if (!session?.user) {
    logout();
  }

  return session;
};

export const isLogin = async (): Promise<boolean> => {
  const sessionResult = await supabase.auth.getSession();
  return Boolean(sessionResult.data.session?.user);
};
