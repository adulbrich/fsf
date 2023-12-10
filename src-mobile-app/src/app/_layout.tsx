import { Slot } from "expo-router";
import { AuthProvider } from "../lib/supabase";
import React, { useEffect } from "react";
import { TamaguiProvider, View } from 'tamagui'
import config from '../../tamagui.config';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import AnimatedAppLoader from '../components/Splash';
import { useAssets } from 'expo-asset';
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '/(auth)/events',
// };

SplashScreen.preventAutoHideAsync();
// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? 'light' : 'dark';


  // if (!loaded) {
  //   return <View flex={1} backgroundColor={'#D73F09'}></View>;
  // }

  return (
    <AnimatedAppLoader image={{ uri: '../../assets/images/osu_badge.png' }}>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <AuthProvider>
          <StatusBar style="light" />
          <View backgroundColor={"$background"} flex={1}>
            <Slot />
          </View>
        </AuthProvider>
      </TamaguiProvider>
    </AnimatedAppLoader>
  );
}