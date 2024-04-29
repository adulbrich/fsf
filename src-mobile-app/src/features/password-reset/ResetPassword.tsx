import React, { useState } from "react";
import { router } from "expo-router";
import { Button, Input, Separator, XStack, YStack } from 'tamagui';
import { Lock, Unlock } from "@tamagui/lucide-icons";


export default function ResetPasswordForm() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [newPassFocus, setNewPassFocus] = useState(false);
    const [confirmPassFocus, setConfirmPassFocus] = useState(false);

    const resetPassword = React.useCallback(() => {
        console.log("reset password brudda")
    }, []);

    return (
        <YStack flex={1} space={"$5"}>
            <XStack width={"100%"} justifyContent="flex-start" alignItems="center">

                <YStack flex={1}>
                <Input
                    id="new_password"
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    secureTextEntry={true}
                    placeholder="New Password"
                    autoCapitalize={'none'}
                    height={"$5"}
                    paddingLeft={"$9"}
                    borderWidth={1}
                    borderBottomWidth={3}
                    focusStyle={{
                    borderColor: '#006A8E55'
                    }}
                    onFocus={() => setNewPassFocus(true)}
                    onBlur={() => setNewPassFocus(false)}
                    />
                </YStack>

                <YStack justifyContent="center" position="absolute" left={"$3"}>
                    <Unlock color={"$gray8"} />
                </YStack>

            </XStack>

            <XStack width={"100%"} justifyContent="flex-start" alignItems="center">

                <YStack flex={1}>
                <Input
                    id="confirm_password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    autoCapitalize={'none'}
                    height={"$5"}
                    paddingLeft={"$9"}
                    borderWidth={1}
                    borderBottomWidth={3}
                    focusStyle={{
                    borderColor: '#006A8E55'
                    }}
                    onFocus={() => setConfirmPassFocus(true)}
                    onBlur={() => setConfirmPassFocus(false)}
                    />
                </YStack>

                <YStack justifyContent="center" position="absolute" left={"$3"}>
                    <Lock color={"$gray8"} />
                </YStack>

                <Separator />

                <Button onPress={resetPassword} marginTop="$2" height={"$5"} color={"white"} borderColor={"black"} borderWidth={2} backgroundColor={"black"}>Reset Password</Button>

            </XStack>
        </YStack>
    )
}