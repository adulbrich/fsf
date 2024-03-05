import { Text } from "tamagui";
import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "../lib/auth";
import { useTypedDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchProfiles } from "../store/profilesSlice";

export default function Index() {
  const { session, isReady, getSession } = useAuth();
  const dispatch = useTypedDispatch();

  // We use this to key 
  const navigationState = useRootNavigationState();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

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