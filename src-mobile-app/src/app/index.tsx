import { Text } from "tamagui";
import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "../lib/auth";

export default function Index() {
  const { session, user, isReady, getSession } = useAuth();

  // We use this to key 
  const navigationState = useRootNavigationState();

  if (!isReady) {
    getSession();
    return <Text>Loading</Text>;
  }

  if (!navigationState?.key) {
    // Temporary fix for router not being ready.
    return null;
  }
  
  if (!session)
    return <Redirect href={'/(auth)/sign-in'} />;
  else
    return <Redirect href={'/(tabs)/events/events-list'} />;
}