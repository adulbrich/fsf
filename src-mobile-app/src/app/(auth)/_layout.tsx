import { useAuth } from "../../lib/supabase";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { session, isReady } = useAuth();

  if (!isReady)
    return null;

  if (session)
    return <Redirect href={"/(tabs)/events"} />;

  return <Slot />;
}