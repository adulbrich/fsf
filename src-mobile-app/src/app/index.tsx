import { useEffect } from "react";
import { useAuth } from "../lib/supabase";
import { Spinner, YStack } from "tamagui";
import { Redirect, router } from "expo-router";

export default function Index() {
  const { session, user, isReady } = useAuth();

  useEffect(() => {
    if (isReady)
      user ? router.replace('/(tabs)/home') : router.replace('/(auth)/sign-in')
  }, [session])

  if (!session)
    return <Redirect href={'/(auth)/sign-in'} />;
  else
    return <Redirect href={'/(tabs)/events'} />;
}