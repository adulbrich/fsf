import { Slot, SplashScreen } from "expo-router";
import { AuthProvider } from "../lib/supabase";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { TamaguiProvider, View } from 'tamagui'
import config from '../../tamagui.config';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Asset, useAssets } from 'expo-asset';
import { Animated, ImageURISource, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Font from 'expo-font';
import Constants from "expo-constants";
import { View as RN_View } from "react-native";
import { StyleSheet } from "react-native";
import { Provider } from 'react-redux';
import { store } from "../store/store";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  // Get the system's theme
  const systemTheme = useColorScheme();

  // This is for the text in the status bar, it needs to be the opposite!
  const statusBarStyle = systemTheme === 'light' ? 'dark' : 'light';

  const [assets] = useAssets([require('../../assets/images/osu_badge.png')])
  if (!assets) return null;

  return (
    <AnimatedAppLoader image={{ uri: assets[0].uri }}>
      <TamaguiProvider config={config} defaultTheme={'light' ?? 'dark'}>
        <Provider store={store}>
          <AuthProvider>
            <StatusBar style={statusBarStyle} />
            <View backgroundColor={"$background"} flex={1}>
              <Slot />
            </View>
          </AuthProvider>
        </Provider>
      </TamaguiProvider>
    </AnimatedAppLoader>
  );
}


function AnimatedAppLoader({ children, image }: AnimatedAppLoaderProps) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri!).downloadAsync()
      setSplashReady(true);
    }
    prepare();
  }, [image]);

  if (!isSplashReady)
    return null;

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

type AnimatedAppLoaderProps = {
  children: ReactNode
  image: ImageURISource
}

function AnimatedSplashScreen({ children, image }: AnimatedAppLoaderProps) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      SplashScreen.hideAsync();

      // Load fonts needed for the app
      await Font.loadAsync({
        SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
      });

    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <RN_View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.expoConfig!.splash!.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.expoConfig!.splash!.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </RN_View>
  );
}