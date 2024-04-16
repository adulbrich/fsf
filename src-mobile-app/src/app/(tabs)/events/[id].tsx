import { Stack, useLocalSearchParams } from "expo-router";
import { H3, YStack, Image, XStack, Text, Button, useTheme } from "tamagui";
import { Text as RN_Text } from 'react-native';
import { useTypedDispatch, useTypedSelector } from "../../../store/store";
import { SBEvent, SBTeamStats } from "../../../lib/supabase-types";
import { useAssets } from "expo-asset";
import { getDateString } from "../../../lib/helpers";
import { useAuth } from "../../../lib/supabase";
import React from "react";
import { setActiveEvent } from "../../../store/eventsSlice";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function EventDetails() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();

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

  const registerCallback = React.useCallback(() => {
    dispatch(setActiveEvent(event));
  }, [session, event]);

  if (!event || !assets) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: event.Name,
          headerShown: true,
          headerBackTitle: 'Events',
          headerStyle: {
            backgroundColor: theme.background.get()
          },
        }}
        />

      <YStack flex={1} justifyContent="flex-start" alignItems="flex-start" padding="$4" gap={'$4'} >

        {/* Event image */}
        <YStack borderRadius={"$4"} overflow="hidden" width={'100%'} height={'$10'}>
          <Image
            width={'100%'}
            height={'100%'}
            resizeMode="stretch"
            source={{ uri: assets[1].uri, width: assets[1].width!, height: assets[1].height! }}
            />
        </YStack>

        {/* Event box for dates, description, and register button */}
        <YStack 
          width={'100%'} 
          padding="$4" 
          borderWidth={1} 
          borderRadius={"$4"}
          borderColor="#898A8D"
          >

          {/* Event dates/timeline */}
          <YStack width="100%" borderWidth={1}>
            <XStack width={'100%'} justifyContent="space-between" alignItems="center">
              <Text color='black'>Starts: { getDateString(event.StartsAt) }</Text>
              <Text color='black'>Ends: { getDateString(event.EndsAt) }</Text>
              <Text color='black'>Type: { event.Type }</Text>
            </XStack>
          </YStack>

          {/* Event Description */}
          <YStack width={'100%'} padding="$4" borderWidth={1} borderRadius="$4" borderColor="#ccc" backgroundColor="#f8f8f8">
            <Text color="black">{event.Description}</Text>
          </YStack>


          {/* Rounded Register Button */}
          <YStack width={'100%'} alignItems="center" padding="$4">
            <Button
              bg={'#eb7434'}
              color={'white'}
              fontSize="$6"
              height="$5"
              width="$14"
              onPress={registerCallback}
              borderRadius="$10"
            >
              Register
            </Button>
          </YStack>
        </YStack>

      </YStack>
        

      <YStack gap={'$4'}>
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

      
    </>
  )
}