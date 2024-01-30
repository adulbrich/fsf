import React from "react";
import { useAuth } from "../../../features/system/Auth";
import { supabase } from "../../../lib/supabase";
import { useAssets } from "expo-asset";
import { useLocalSearchParams, Stack } from "expo-router";
import { YStack, XStack, H3, Image, Text, Button } from "tamagui";
import { getDateString } from "../../../lib/helpers";
import { SBEvent, SBTeamStats } from "../../../lib/supabase-types";
import { useTypedSelector } from "../../../store/store";
import { Text as RN_Text } from "react-native";

export default function EventDetails() {
  const slugEventID = useLocalSearchParams().id;
  const event = useTypedSelector<SBEvent[]>(store => store.eventsSlice.events)
    .find(ev => ev.EventID === slugEventID);

  const { user, session } = useAuth();

  const teamStats = useTypedSelector<SBTeamStats[]>(store => store.teamStatsSlice.teamStats)
    .filter(ts => ts.BelongsToEventID === slugEventID)
    .sort((a, b) => (b.TotalScore ?? 0) - (a.TotalScore ?? 0));

  const [assets] = useAssets([
    require('../../../../assets/images/preview_square.jpg'),
    require('../../../../assets/images/preview_wide.jpg')
  ]);

  const joinEventCallback = React.useCallback(async () => {
    const createTeamResult = await supabase
      .from('Teams')
      .upsert({
        Name: session!.user.email!,
        BelongsToEventID: event!.EventID
      })
      .select()
      .single();

    if (createTeamResult.error) {
      console.log(createTeamResult.error);
      return;
    }

    const joinTeamResult = await supabase
      .from('TeamsProfiles')
      .upsert({
        ProfileID: session!.user.id,
        TeamID: createTeamResult.data.TeamID
      })
      .select()
      .single();

    if (joinTeamResult.error) {
      console.log(joinTeamResult.error);
      return;
    }

    console.log('Joined Event');
  }, [session, event])

  if (!event || !assets) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: event.Name,
          headerShown: true,
          headerBackTitle: 'Events'
        }}
        />
      <YStack flex={1} justifyContent="flex-start" alignItems="flex-start" padding="$4" space>
        
        <YStack borderRadius={"$4"} overflow="hidden" width={'100%'} height={'$12'}>

          <Image
            width={'100%'}
            height={'100%'}
            resizeMode="stretch"
            source={{ uri: assets[1].uri, width: assets[1].width!, height: assets[1].height! }}
            />
        </YStack>

        <XStack width={'100%'} justifyContent="space-between" alignItems="center">
          <Text>Starts: { getDateString(event.StartsAt) }</Text>
          <Text>Ends: { getDateString(event.EndsAt) }</Text>
          <Text>Type: { event.Type }</Text>
        </XStack>

        <YStack width={'100%'}>
          <Button onPress={joinEventCallback} width={'100%'} themeInverse={true}>Join Event</Button>
        </YStack>

        <YStack space>
          <H3>Top 5 Teams</H3>
          { teamStats.length === 0 && (
            <XStack width={'100%'} justifyContent="center">
              <Text>No stats available</Text>
            </XStack>
          )}
          { teamStats.slice(0, 5).map(ts =>
            <XStack key={ts.TeamID} width={'100%'} justifyContent="space-between" alignItems="flex-end">
              <Text>{ ts.Name }</Text>
              <RN_Text ellipsizeMode="clip" numberOfLines={1} style={[{ flex: 1, marginHorizontal: 12 }]}>
                .........................................................................
              </RN_Text>
              <Text>{ ts.TotalScore ?? 0 }</Text>
            </XStack>
          )}
        </YStack>
      </YStack>
    </>
  )
}