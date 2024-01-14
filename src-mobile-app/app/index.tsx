import { Slot, Stack } from "expo-router"
import { Button, Text, View } from "react-native"
import TWButton from "../components/TWButton"
import Pedometer from '../components/Pedometer';

export default function Index() {
  return (
    <View className="flex flex-col h-screen items-center justify-start mt-12">
      <Stack.Screen options={{ title: 'Hello World' }} />
      <Text className="text-">From tailwind</Text>
      <TWButton />
      <Pedometer />
    </View>
  )
}


/*
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import RankView from './screens/RankView';
import HomeView from './screens/HomeView';


 * 
 * Root page
 * 
 * @returns
 

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // set icon
          let iconName: string = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Events" component={RankView} />
      <Tab.Screen name="Profile" component={RankView} />
      <Tab.Screen name="Settings" component={RankView} />
    </Tab.Navigator>
  );
}

// root page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/