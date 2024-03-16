import React, { useRef, useState } from "react";
import { YStack, styled, StackProps, ScrollView, AnimatePresence, Circle, XStack, View, H1, H2, Button, Popover, H3, H4, H5, Text, Group, Adapt } from "tamagui";
import EventCard from "./EventCard";
import { ArrowUp, MoreHorizontal } from "@tamagui/lucide-icons";
import { NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from "react-native";
import { ScrollView as RN_ScrollView } from "react-native";
import { RootState, useTypedDispatch } from "../../store/store";
import { SBEventStatus, fetchEvents, selectFilteredEvents, setSelectedStatus } from "../../store/eventsSlice";
import { useSelector } from "react-redux";
import { fetchTeamStats } from "../../store/teamStatsSlice";

export default function Events() {
  const dispatch = useTypedDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [scrollHint, setScrollHint] = useState(false);
  const scrollRef = useRef<RN_ScrollView>(null);
  const [popover, setPopover] = useState(false);

  // Get events to display based on user selected status (ongoing, past, etc)
  const events = useSelector(selectFilteredEvents);
  const selectedStatus = useSelector<RootState, SBEventStatus>(state => state.eventsSlice.selectedStatus);

  const handleScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 200) setScrollHint(true);
    else setScrollHint(false);
  }, [setScrollHint]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchEvents());
    await dispatch(fetchTeamStats());
    setRefreshing(false);
  }, [dispatch, setRefreshing]);

  function getSelectedText() {
    switch (selectedStatus) {
      case SBEventStatus.UPCOMING:
        return 'Upcoming';
      case SBEventStatus.ONGOING:
        return 'Ongoing';
      case SBEventStatus.PAST:
        return 'Past';
    }
  }

  return (
    <View flex={1}>
      <ScrollView
        ref={scrollRef}
        marginTop={"$4"}
        paddingBottom={"$4"}
        stickyHeaderIndices={[1]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} title="Refresh!" titleColor={'black'} />}
        onScroll={handleScroll}
        scrollEventThrottle={2}
      >

        <YStack flex={1} paddingHorizontal={"$4"} paddingBottom={"$8"} space>
          <XStack justifyContent="space-between" alignItems="center">
            <H2>{ getSelectedText() }</H2>


            <AnimatePresence>
              <Popover>
                <Popover.Trigger asChild>
                  <Button circular icon={<MoreHorizontal size={"$1"} />} transparent></Button>
                </Popover.Trigger>

                <Adapt when="sm" platform="touch">
                  <Popover.Sheet modal dismissOnSnapToBottom >
                    <Popover.Sheet.Frame padding="$4">
                      <Adapt.Contents />
                    </Popover.Sheet.Frame>
                    <Popover.Sheet.Overlay
                      animation="lazy"
                      enterStyle={{ opacity: 0 }}
                      exitStyle={{ opacity: 0 }}
                    />
                  </Popover.Sheet>
                </Adapt>


                <Popover.Content elevate backgroundColor={"$background"} enterStyle={{ x: -10, opacity: 0 }} animation="quick">
                  <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
                  
                  <YStack width={"100%"} flex={1} gap={0} alignItems="center">

                    <H4>Filter events</H4>
                  
                    <Group width={'100%'} padding="$4">
                      <Popover.Close asChild>
                        <Button backgroundColor={selectedStatus === SBEventStatus.ONGOING ? "#eb7434" : "$orange3"} onPress={() => {
                          setPopover(!popover);
                          dispatch(setSelectedStatus(SBEventStatus.ONGOING))
                        }} borderBottomRightRadius={0} borderBottomLeftRadius={0}>
                          <Text color={selectedStatus === SBEventStatus.ONGOING ? "white" : "$gray12"} fontWeight={"400"}>Ongoing</Text>
                        </Button>
                      </Popover.Close>
                      <Popover.Close asChild>
                        <Button backgroundColor={selectedStatus === SBEventStatus.UPCOMING ? "#eb7434" : "$orange3"} onPress={() => {
                          setPopover(!popover);
                          dispatch(setSelectedStatus(SBEventStatus.UPCOMING))
                        }} borderRadius={0}>
                          <Text color={selectedStatus === SBEventStatus.UPCOMING ? "$gray12" : "$gray12"} fontWeight={"400"}>Upcoming</Text>
                        </Button>
                      </Popover.Close>
                      <Popover.Close asChild>
                        <Button backgroundColor={selectedStatus === SBEventStatus.PAST ? "#eb7434" : "$orange3"} onPress={() => {
                          setPopover(!popover);
                          dispatch(setSelectedStatus(SBEventStatus.PAST))
                        }} borderTopRightRadius={0} borderTopLeftRadius={0}>
                          <Text color={selectedStatus === SBEventStatus.PAST ? "white" : "$gray12"} fontWeight={"400"}>Past</Text>
                        </Button>
                      </Popover.Close>
                    </Group>
                    
                  </YStack>
                  
                  
                </Popover.Content>
              </Popover>
            </AnimatePresence>
            
          </XStack>


          {events.map(ev => <EventCard key={ev.EventID} event={ev} /> )}
        </YStack>
        
      </ScrollView>

      

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
    </View>
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