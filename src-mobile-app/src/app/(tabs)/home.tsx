import { useSelector } from "react-redux";
import { YStack, useTheme, H4, XStack, ScrollView, H3, Text, View } from "tamagui";
import { fetchTeamStatsBreakdown, selectMyTeamStats } from "../../store/teamStatsSlice";
import { SafeAreaView } from "react-native";
import { Text as RN_Text } from "react-native";
import { useTypedDispatch, useTypedSelector } from "../../store/store";
import { selectEvents } from "../../store/eventsSlice";
import { useEffect } from "react";

export default function Home() {
  const theme = useTheme();
  const myTeamStats = useSelector(selectMyTeamStats);
  const events = useTypedSelector(selectEvents);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTeamStatsBreakdown());
  });

  const vm = myTeamStats.map(ts => ({
      ...ts,
      Event: events.find(ev => ev.EventID === ts.EventID)
  }));

  return (
    <SafeAreaView>
      <ScrollView height={'100%'} padding="$4">
        <YStack justifyContent="center" alignItems="center" flex={1} gap="$4">
      
          {vm.map(ts => (
            <YStack width={'100%'} paddingHorizontal="0" key={ts.TeamID} gap="$4">
              <H3>{ts.Event?.Name}</H3>
              <XStack justifyContent="space-between" alignItems="flex-end">
                <H4>{ts.TeamName}</H4>
                <H4>{ts.TotalScore}</H4>
              </XStack>
              <View width={'100%'} height={1} backgroundColor={'$gray10'} />
              {ts.Profiles.map(ps => (
                <XStack justifyContent="space-between" key={ps.ProfileID} alignItems="flex-end">
                  <Text>{ps.ProfileName}</Text>
                  <Text>{ps.TotalScore}</Text>
                </XStack>
              ))}
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}