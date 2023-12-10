import React from "react";
import { YStack, Tabs, Separator, Text } from "tamagui";
import { SBEvent, Tables } from "../../lib/supabase-types";
import EventCard from "../../components/events/EventCard";

export enum SBEventStatus {
  UPCOMING,
  ONGOING,
  PAST
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

type Props = {
  events: Tables<'Events'>[]
}

export default function Events({ events }: Props) {
  return (
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
  );
}