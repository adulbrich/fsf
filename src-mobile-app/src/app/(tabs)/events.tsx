import { supabase } from "../../lib/supabase";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, YStack, Spinner, useTheme, XStack, Tabs, Separator, Text, Square, AnimatePresence } from "tamagui";
import { RefreshControl } from "react-native";
import { SBEvent, Tables } from "../../lib/supabase-types";
import EventCard from "../../components/events/EventCard";
import ThemedInput from "../../components/ThemedInput";
import { ArrowUp } from '@tamagui/lucide-icons';
import { ScrollView as RNScrollView } from "react-native";

export enum SBEventStatus {
  UPCOMING,
  ONGOING,
  PAST
}

export default function Events() {
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const [events, setEvents] = useState<Tables<'Events'>[]>([]);
  const [scrollHint, setScrollHint] = useState(false);
  const theme = useTheme();

  const scrollRef = useRef<ScrollView>(null);

  async function getEvents() {
    const { data } = await supabase
    .from('Events')
    .select('*');

    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    if (data) setEvents(data);
    setLoaded(true);
    setRefreshing(false);
  }

  function filterSBEventsByStatus(events: SBEvent[], status: SBEventStatus): SBEvent[] {
    const currentTime = new Date().getTime();

    return events.filter(ev => {
      const eventStarts = new Date(ev.StartsAt).getTime();
      const eventEnds = new Date(ev.EndsAt).getTime();

      switch (status) {
        case SBEventStatus.UPCOMING:
          return currentTime < eventStarts;
        case SBEventStatus.ONGOING:
          return currentTime < eventEnds && currentTime > eventStarts;
        case SBEventStatus.PAST:
          return currentTime > eventEnds;
      }
    });
  }

  function handleScroll(event: any) {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (yOffset > 200)
      setScrollHint(true);
    else
      setScrollHint(false);
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
    return <YStack backgroundColor={theme.backgroundStrong} flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </YStack>
  }

  return (
    <>
      <ScrollView
        ref={scrollRef}
        backgroundColor={theme.backgroundStrong}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} title="Refresh!" />}
        padding={"$4"}
        space
        onScroll={(ev) => handleScroll(ev)}
        scrollEventThrottle={2}
        >
        <ThemedInput placeholder="Search..." />
        <Tabs
          defaultValue="ongoing"
          orientation="horizontal"
          flexDirection="column"
          marginBottom={"$16"}
          >
          <Tabs.List
            separator={<Separator vertical />}
            >
            <Tabs.Tab flex={1} value="ongoing"><Text>Ongoing</Text></Tabs.Tab>
            <Tabs.Tab flex={1} value="upcoming"><Text>Upcoming</Text></Tabs.Tab>
            <Tabs.Tab flex={1} value="past"><Text>Past</Text></Tabs.Tab>
          </Tabs.List>

        
          <Tabs.Content value="ongoing">
            <YStack flex={1} space paddingTop={"$4"}>
              {filterSBEventsByStatus(events, SBEventStatus.ONGOING).map(ev => <EventCard key={ev.EventID} event={ev} /> )}
            </YStack>
          </Tabs.Content>

          <Tabs.Content value="upcoming">
            <YStack flex={1} space paddingTop={"$4"}>
              {filterSBEventsByStatus(events, SBEventStatus.UPCOMING).map(ev => <EventCard key={ev.EventID} event={ev} /> )}
            </YStack>
          </Tabs.Content>

          <Tabs.Content value="past">
            <YStack flex={1} space paddingTop={"$4"}>
              {filterSBEventsByStatus(events, SBEventStatus.PAST).map(ev => <EventCard key={ev.EventID} event={ev} /> )}
            </YStack>
          </Tabs.Content>

        </Tabs>
      </ScrollView>
      <XStack position="absolute" bottom={2} paddingBottom="$4" justifyContent="center" alignItems="center" width={'100%'}>
          <AnimatePresence>
            { scrollHint && (
              <Square borderRadius={"$4"} onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} enterStyle={{ opacity: 0, y: 100 }} exitStyle={{ opacity: 0, y: 100 }} animation="medium" backgroundColor={"#D3832B"} padding={"$3"}>
                <ArrowUp />
              </Square>
            )}
          </AnimatePresence>
      </XStack>
    </>
  );
}