import { Text } from "tamagui";
import { useAuth } from "../lib/supabase";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, user, isReady, getSession } = useAuth();

  if (!isReady) {
    getSession();
    return <Text>Loading</Text>;
  }

  if (!session)
    return <Redirect href={'/(auth)/sign-in'} />;
  else
    return <Redirect href={'/(tabs)/events'} />;
}