import { TrafficCone } from "@tamagui/lucide-icons";
import { YStack, useTheme, XStack, H3 } from "tamagui";

export default function Home() {
  const theme = useTheme();
  
  return (
    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1} space>
      <XStack>
        <TrafficCone size={"$4"} />
      </XStack>
      <H3>Home Page</H3>
    </YStack>
  );
}