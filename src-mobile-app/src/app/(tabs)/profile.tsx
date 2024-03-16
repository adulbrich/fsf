import { TrafficCone } from "@tamagui/lucide-icons";
import { H3, XStack, YStack, useTheme } from "tamagui";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../store/profilesSlice";
import { useEffect } from "react";
import { useAuth } from "../../features/system/Auth";

export default function Profile() {
  const theme = useTheme();
  const { session } = useAuth();

  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  useEffect(() => {
    console.log(session?.user);
  }, [session]);
  
  return (

    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1} space>
      <XStack>
        <TrafficCone size={"$4"} />
      </XStack>
      <H3>Profile</H3>
    </YStack>
  );
}