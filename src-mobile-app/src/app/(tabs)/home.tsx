import { supabase } from "../../lib/supabase";
import { YStack, Text, useTheme } from "tamagui";

export default function Home() {
  const theme = useTheme();
  
  return (
    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1}>
      <Text>Home Page</Text>
    </YStack>
  );
}