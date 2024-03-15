import { useSelector } from "react-redux";
import { YStack, useTheme, H5, H4, XStack, ScrollView, H3, Text } from "tamagui";
import { fetchProfileStats, selectMyProfileStats } from "../../store/profileStatsSlice";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store/store";
import { fetchTeamStatsBreakdown, selectMyTeamStats } from "../../store/teamStatsSlice";
import { SafeAreaView } from "react-native";
import { Text as RN_Text } from "react-native";

export default function Home() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const myProfileStats = useSelector(selectMyProfileStats);
  const myTeamStats = useSelector(selectMyTeamStats);

  useEffect(() => {
    dispatch(fetchProfileStats());
    dispatch(fetchTeamStatsBreakdown());
  }, []);


  return (
    <SafeAreaView>
      <ScrollView height={'100%'} backgroundColor={theme.backgroundStrong}>
        <YStack justifyContent="center" alignItems="center" flex={1} space>
          <XStack width={'100%'} justifyContent="center" alignItems="center" padding="$4" backgroundColor={'$background'} space>
            <H5>My Total Steps</H5>
            <H4>{ myProfileStats?.TotalScore ?? 0 }</H4>
          </XStack>

          <H3>My Teams</H3>

          {myTeamStats.map(ts => (
            <YStack width={'100%'} padding="$4" backgroundColor={'$background'} key={ts.TeamID} space>
              <XStack alignItems="flex-end">
                <H4>{ts.TeamName}</H4>
                <RN_Text ellipsizeMode="clip" numberOfLines={1} style={[{ flex: 1, marginHorizontal: 12, paddingBottom: 4 }]}>
                  .........................................................................
                </RN_Text>
                <H4>{ts.TotalScore}</H4>
              </XStack>
              {ts.Profiles.map(ps => (
                <XStack key={ps.ProfileID} alignItems="flex-end">
                  <Text>{ps.ProfileName}</Text>
                  <RN_Text ellipsizeMode="clip" numberOfLines={1} style={[{ flex: 1, marginHorizontal: 12 }]}>
                  .........................................................................
                  </RN_Text>
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