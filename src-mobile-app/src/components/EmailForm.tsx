import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Form, Input, Label, YStack } from 'tamagui';
import { router } from 'expo-router';

export default function EmailForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    router.push('/(tabs)/home');
  }

  return (
    <YStack padding={50}>
      <Form onSubmit={signInWithEmail}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="my@oregonstate.edu"
          autoCapitalize={'none'}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="********"
          autoCapitalize={'none'}
        />
        <Form.Trigger asChild marginTop={35}>
          <Button disabled={loading}>Sign in</Button>
        </Form.Trigger>
      </Form>
    </YStack>
  )
}