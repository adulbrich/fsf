import { supabase } from "../../lib/supabase";
import { Button, YStack, Text } from "tamagui";

function signOut() {
  supabase.auth.signOut();
}

export default function Settings() {
  return (
    <YStack>
      <Text>Settings</Text>
      <Button onPress={() => signOut()}>Sign out</Button>
    </YStack>
  );
}