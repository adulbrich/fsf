import React, { useEffect } from "react";
import { YStack, Spinner, useTheme } from "tamagui";
import EventList from "../../../features/events/EventList";
import EventDetailsSheet from "../../../features/events/EventSheet";
import { fetchEvents } from "../../../store/eventsSlice";
import { useTypedDispatch, useTypedSelector } from "../../../store/store";
import { Stack } from "expo-router";
import { fetchTeamStats } from "../../../store/teamStatsSlice";
import { syncMyActivity } from "../../../store/progressSlice";
import { SBEvent } from "../../../lib/models";

export default function EventsList() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const events = useTypedSelector<SBEvent[]>(state => state.eventsSlice.events)

  // Get the initial data loaded
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchTeamStats());
    dispatch(syncMyActivity());
  }, [dispatch]);

  if (!events || events.length === 0) {
    return <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </YStack>
  }

  return (
    <>
      <YStack
        fullscreen
        flex={1}
        gap={'$4'}
      >
        <Stack.Screen options={{ title: 'Events', headerShown: false }} />
        <EventList />
      </YStack>
      <EventDetailsSheet />
    </>
  );
}