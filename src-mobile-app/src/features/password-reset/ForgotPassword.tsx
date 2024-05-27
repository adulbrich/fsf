import React, { useState } from "react";
import { router } from "expo-router";
import { Button, Input, Separator, XStack, YStack } from 'tamagui';
import { Mail } from "@tamagui/lucide-icons";
import { useAuth } from '../system/Auth';


export default function ForgotPasswordForm() {

    const [email, setEmail] = useState('')
    const [emailFocus, setEmailFocus] = useState(false);
    const { forgotPassword } = useAuth();
    const [loading, setLoading] = useState(false)

    const sendPasswordEmail = React.useCallback(async () => {
        if (loading) return;
        setLoading(true);
        // perform backend send email here
        await forgotPassword(email);
        setLoading(false);
    }, [email]);
   
    const goBackHome = React.useCallback(() => {
        console.log("go back home")
        router.navigate(`/sign-in`);
    }, []);

    return (
        <YStack flex={1} space={"$5"}>
             <XStack width={"100%"} justifyContent="flex-start" alignItems="center">
        
                <YStack flex={1}>
                <Input
                    id="curr_email"
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
            <Button onPress={goBackHome} position="absolute" bottom={"$2"} left={0} right={0} color={"$gray9"} backgroundColor={'transparent'}>Back to home</Button>
        </YStack>
    )
}