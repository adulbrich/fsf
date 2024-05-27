import React, { useState } from 'react'
import { Button, Input, Separator, XStack, YStack } from 'tamagui';
import { Lock, Mail } from '@tamagui/lucide-icons';
import { useAuth } from '../system/Auth';
import { router } from 'expo-router';

export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth();

  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);


  const forgotPassword = React.useCallback(() => {
    router.navigate(`/forgot-password`);
  }, []);


  const signInWithEmail = React.useCallback(async () => {
    if (loading) return;
    setLoading(true)
    await signIn(email, password);
    setLoading(false);
  }, [email, password]);

  return (
    <YStack flex={1} space={"$5"}>
      <XStack width={"100%"} justifyContent="flex-start" alignItems="center">
        
        <YStack flex={1}>
          <Input
            id="email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            autoCapitalize={'none'}
            height={"$5"}
            paddingLeft={"$9"}
            borderWidth={1}
            borderBottomWidth={3}
            focusStyle={{
              borderColor: '#006A8E55'
            }}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            />
        </YStack>

        <YStack justifyContent="center" position="absolute" left={"$3"}>
          <Mail color={"$gray8"} />
        </YStack>

      </XStack>

      <XStack width={"100%"} justifyContent="flex-start" alignItems="center">

        <YStack flex={1}>
          <Input
            id="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            height={"$5"}
            paddingLeft={"$9"}
            borderWidth={1}
            borderBottomWidth={3}
            focusStyle={{
              borderColor: '#006A8E55'
            }}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            />
        </YStack>

        <YStack justifyContent="center" position="absolute" left={"$3"}>
          <Lock color={"$gray8"} />
        </YStack>

      </XStack>
      
      <Separator />

      <Button onPress={signInWithEmail} marginTop="$2" height={"$5"} color={"white"} borderColor={"black"} borderWidth={2} backgroundColor={"black"}>Sign in to DamFit</Button>
      <Button onPress={forgotPassword} position="absolute" bottom={"$2"} left={0} right={0} color={"$gray9"} backgroundColor={'transparent'}>Forgot my password</Button>
    </YStack>
  )
}