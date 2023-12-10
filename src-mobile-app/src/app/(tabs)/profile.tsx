import { supabase } from "../../lib/supabase";
import { Button, Text, YStack } from "tamagui";

function signOut() {
  supabase.auth.signOut();
}

export default function Profile() {
  return (
    <YStack>
      <Text>Profile!</Text>
    </YStack>
  );
}