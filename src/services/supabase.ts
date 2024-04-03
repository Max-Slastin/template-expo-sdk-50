//https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?database-method=dashboard&auth-store=async-storage

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY;

export enum SupabaseRequestStatus {
  Ok = "ok",
  Error = "error",
}

export type SupabaseResult = {
  status: SupabaseRequestStatus;
  error?: string;
  data?: any;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
