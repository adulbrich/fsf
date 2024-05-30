import { Image, YStack } from "tamagui";
import ForgotPasswordForm from "../../features/password-reset/ForgotPassword";
import React from "react";
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import Animated from "react-native-reanimated";
import { useAssets } from "expo-asset";
import { ImageURISource, useWindowDimensions } from "react-native";

export default function ForgotPassword() {
  const keyboard = useAnimatedKeyboard();
  const { width, height } = useWindowDimensions();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value / 2.5 }],
      flex: 1
    };
  });

  const [headerImage] = useAssets([
    require('../../../assets/images/signin_header.png'),
    require('../../../assets/images/osu_name_only.png'),
  ]);

  return (
    <Animated.View style={ translateStyle }>
      <YStack
        flex={0.3}
        flexBasis={0.25}
        height={"100%"}
        backgroundColor={'#D73F09'}
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        { headerImage && (
          <Image position="absolute" bottom={-80.5} width={width} height={headerImage[0].height!} resizeMode="contain" source={headerImage[0] as ImageURISource} />
        )}
      </YStack>

      <YStack flex={1} flexBasis={0.75} justifyContent="flex-start" alignItems="center" paddingHorizontal="$8" paddingTop="$8" paddingBottom="$4" space="$8">
        { headerImage && (
          <Image top={0} width={width / 2} height={headerImage[1].height! / 4} resizeMode="contain" source={headerImage[1] as ImageURISource} />
        )}

        <ForgotPasswordForm />
      </YStack>

      
    </Animated.View>
  )
}