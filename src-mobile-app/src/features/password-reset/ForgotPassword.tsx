import React, { useState } from "react";
import { router } from "expo-router";
import { Button, Input, Separator, XStack, YStack } from 'tamagui';
import { Mail } from "@tamagui/lucide-icons";


export default function ForgotPasswordForm() {

    const [email, setEmail] = useState('')
    const [emailFocus, setEmailFocus] = useState(false);

    const sendPasswordEmail = React.useCallback(() => {
        console.log("send that email")
        // perform backend send email here
        
    }, []);

    return (
        <YStack flex={1}>
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
            
            <Separator />

            <Button onPress={sendPasswordEmail} marginTop="$2" height={"$5"} color={"white"} borderColor={"black"} borderWidth={2} backgroundColor={"black"}>Send Email</Button>
        </YStack>
    )
}