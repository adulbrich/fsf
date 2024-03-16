import React from "react";
import { View, YStack } from "tamagui";
import EventList from "../../../features/events/EventList";
import EventDetailsSheet from "../../../features/events/EventSheet";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function EventsList() {
  return (
    <SafeAreaView>
      <View height={'100%'}>
        <YStack
          fullscreen
          flex={1}
          gap={'$4'}
        >
          <Stack.Screen options={{ title: 'Events', headerShown: false }} />
          <EventList />
        </YStack>
        <EventDetailsSheet />
      </View>
    </SafeAreaView>
  );
}