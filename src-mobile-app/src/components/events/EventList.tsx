import React, { useState } from "react";
import { YStack, Tabs, Separator, Text, TabLayout, styled, StackProps, ScrollView, Input, View } from "tamagui";
import { SBEvent, Tables } from "../../lib/supabase-types";
import EventCard from "../../components/events/EventCard";
import { LinearGradient } from "tamagui/linear-gradient";

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
      activationMode="manual"
      backgroundColor={"transparent"}
      height={'100%'}
      >
      
      <ScrollView
        paddingBottom={"$4"}
        stickyHeaderIndices={[1]}
      >
        <Tabs.List
        loop={false}
        backgroundColor={"transparent"}
        paddingTop={"$4"}
        paddingHorizontal={"$4"}
        >
          <Tabs.Tab flex={1} value="ongoing"><Text>Ongoing</Text></Tabs.Tab>
          <Tabs.Tab flex={1} value="upcoming"><Text>Upcoming</Text></Tabs.Tab>
          <Tabs.Tab flex={1} value="past"><Text>Past</Text></Tabs.Tab>
        </Tabs.List>

        <YStack
        backgroundColor={"$backgroundStrong"}
        >
          <Input margin={"$4"} marginBottom={"$4"} placeholder="Search..." size={"$3"} />
        </YStack>

        {/* <Separator /> */}

        <YStack flex={1} paddingHorizontal={"$4"} paddingBottom={"$8"}>
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
        </YStack>
      </ScrollView>
      
    </Tabs>
  );
}

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  )
}

const AnimatedYStack = styled(YStack, {
  variants: {
    isLeft: { true: { x: -25, opacity: 0 } },
    isRight: { true: { x: 25, opacity: 0 } },
    defaultFade: { true: { opacity: 0 } },
  } as const,
})