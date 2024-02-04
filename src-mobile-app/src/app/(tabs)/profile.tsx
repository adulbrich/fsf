import { TrafficCone } from "@tamagui/lucide-icons";
import { H3, XStack, YStack, useTheme } from "tamagui";

export default function Profile() {
  const theme = useTheme();
  
  return (
    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1} space>
      <XStack>
        <TrafficCone size={"$4"} />
      </XStack>
      <H3>Profile</H3>
    </YStack>
  );
}