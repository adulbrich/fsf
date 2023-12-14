import React, { useEffect } from "react";
import { YStack, Spinner, useTheme } from "tamagui";
import { SBEvent } from "../../../lib/supabase-types";
import EventList from "../../../features/events/EventList";
import EventDetailsSheet from "../../../features/events/EventSheet";
import { fetchEvents } from "../../../store/eventsSlice";
import { useTypedDispatch, useTypedSelector } from "../../../store/store";
import { Stack } from "expo-router";

export default function EventsList() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const events = useTypedSelector<SBEvent[]>(state => state.events.events)
  
  // Get the initial data loaded
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (!events || events.length === 0) {
    return <YStack
      backgroundColor={theme.background}
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
        backgroundColor={theme.background}
        flex={1}
        space
      >
        <Stack.Screen options={{ title: 'Events', headerShown: false }} />
        <EventList />
      </YStack>
      <EventDetailsSheet />
    </>
  );
}