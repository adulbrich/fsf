import { Stack } from "expo-router";
import { H3, YStack } from "tamagui";

export default function EventDetails() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Stack.Screen
        options={{
          title: 'Event Details',
          headerShown: true,
          headerBackTitle: 'Events'
        }}
        />
      <H3>Hello World</H3>
    </YStack>
  )
}