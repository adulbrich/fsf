import { useAuth } from "../../lib/supabase";
import { Button, YStack, Text } from "tamagui";


export default function Settings() {
  const { signOut } = useAuth();
  
  return (
    <YStack backgroundColor={"$backgroundStrong"} flex={1} justifyContent="center" alignItems="center">
      <Text>Settings</Text>
      <Button onPress={() => signOut()}>Sign out</Button>
    </YStack>
  );
}