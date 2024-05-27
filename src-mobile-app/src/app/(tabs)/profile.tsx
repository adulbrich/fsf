import { SafeAreaView } from "react-native";
import { Button, H3, H4, H5, ScrollView, XStack, YStack, useTheme } from "tamagui";
import { useTypedSelector } from "../../store/store";
import { selectMyProfileStats } from "../../store/profileStatsSlice";
import { selectMyProfile } from "../../store/profilesSlice";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { useAuth } from "../../features/system/Auth";

export default function Profile() {
  const auth = useAuth();
  const myProfileStats = useTypedSelector(selectMyProfileStats);
  const myProfile = useTypedSelector(selectMyProfile);

  const [header, setHeader] = useState('Good evening.');

  useEffect(() => {
    if (myProfile?.Name)
      setHeader(`Good evening, ${myProfile.Name.split(' ')[0]}.`)
  }, [myProfile])

  const signOut = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <SafeAreaView>
      <ScrollView height={'100%'} padding="$4">
        <YStack justifyContent="center" alignItems="center" flex={1} gap>
          <H3 alignSelf="flex-start">{header}</H3>
          <XStack width={'100%'} justifyContent="center" alignItems="center" padding="$4" gap="$4">
            <H5>My Total Steps</H5>
            <H4>{ myProfileStats?.TotalScore ?? 0 }</H4>
          </XStack>
          <Button bg={'black'} color={'white'} onPress={signOut}>Sign Out</Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}