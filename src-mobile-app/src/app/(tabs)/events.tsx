import { supabase } from "../../lib/supabase";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, YStack, Spinner, useTheme, XStack, AnimatePresence, Circle, Input, View } from "tamagui";
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from "react-native";
import { Tables } from "../../lib/supabase-types";
import { ArrowUp } from '@tamagui/lucide-icons';
import { ScrollView as RN_ScrollView } from "react-native";
import EventList from "../../components/events/EventList";
import EventDetailsSheet from "../../components/events/EventSheet";

export default function Events() {
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const [events, setEvents] = useState<Tables<'Events'>[]>([]);
  const [scrollHint, setScrollHint] = useState(false);
  const theme = useTheme();

  const scrollRef = useRef<RN_ScrollView>(null);

  async function getEvents() {
    const { data } = await supabase
    .from('Events')
    .select('*');

    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    if (data) setEvents(data);
    setLoaded(true);
    setRefreshing(false);
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 200) setScrollHint(true);
    else setScrollHint(false);
  }

  const onRefresh = React.useCallback(async () => {
    setEvents([])
    setRefreshing(true);
    await getEvents();
  }, []);

  // Get the initial data loaded
  useEffect(() => {
    getEvents();
  }, []);

  if (!loaded) {
    return <YStack
      backgroundColor={theme.backgroundStrong}
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
        backgroundColor={theme.backgroundStrong}
        flex={1}
        space
        >
        <EventList events={events} />
      </YStack>
      <XStack
        position="absolute"
        bottom={2}
        paddingBottom="$4"
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <AnimatePresence>
          { scrollHint && (
            <Circle
              onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
              enterStyle={{ opacity: 0, y: 100 }}
              exitStyle={{ opacity: 0, y: 100 }}
              animation="medium"
              backgroundColor={"#D3832B"}
              padding={"$3"}
            >
              <ArrowUp />
            </Circle>
          )}
        </AnimatePresence>
      </XStack>
      <EventDetailsSheet />
    </>
  );
}