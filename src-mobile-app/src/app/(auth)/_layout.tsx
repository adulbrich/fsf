import { useEffect } from "react";
import { useAuth } from "../../lib/supabase";
import { Slot, router } from "expo-router";
import { Stack } from "tamagui";

export default function AuthLayout() {
  const { session, isReady } = useAuth();

  useEffect(() => {
    if (session && isReady)
      router.replace('/(tabs)/events');
  }, [session]);

  return <Slot />;
}