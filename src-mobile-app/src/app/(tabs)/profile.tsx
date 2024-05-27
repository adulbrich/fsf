import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { H3, H4, H5, XStack, YStack, Button, Input, Text } from "tamagui";
import { useTypedSelector } from "../../store/store";
import { selectMyProfileStats } from "../../store/profileStatsSlice";
import { selectMyProfile } from "../../store/profilesSlice";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../features/system/Auth";

const Profile = () => {
  const auth = useAuth();
  const myProfileStats = useTypedSelector(selectMyProfileStats);
  const myProfile = useTypedSelector(selectMyProfile);
  const [header, setHeader] = useState('Good evening.');
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(myProfile?.Name?.split(' ')[0] || '');

  useEffect(() => {
    if (myProfile?.Name) {
      setHeader(`Good evening, ${myProfile.Name.split(' ')[0]}.`);
      setUsername(myProfile.Name);
    }
  }, [myProfile]);

  const changeName = async () => {
    if (!myProfile) return;
    await supabase.from('Profiles')
      .update({ Name: username }) // Use the `username` state variable here
      .eq('ProfileID', myProfile.ProfileID);
  };

  const onSave = useCallback(() => {
    changeName(); // Call the changeName function here
    setHeader(`Good evening, ${username.split(' ')[0]}.`);
    setIsEditing(false); // Close the edit mode after saving
  }, [username]);

  const signOut = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <YStack justifyContent="center" alignItems="center" flex={1} gap="$4">
          <H3 alignSelf="flex-start" color="#D73F09">{header}</H3>
          <XStack width={'100%'} justifyContent="center" alignItems="center" padding="$4" gap="$4">
            <H5>My Total Steps</H5>
            <H4>{myProfileStats?.TotalScore ?? 0}</H4>
          </XStack>
        </YStack>

        <YStack paddingTop="$5" space>
          <Text fontSize="$8" fontWeight="bold" textAlign="center" color="#D73F09">
            OSU FSF
          </Text>
          {!isEditing ? (
            <YStack alignItems="center" space="$4">
              <Text fontSize="$6" fontWeight="bold">{username}</Text>
              <Button onPress={() => setIsEditing(true)}>Edit Profile Information</Button>
            </YStack>
          ) : (
            <YStack space="$4" paddingHorizontal="$6">
              <Text fontSize="$7" fontWeight="bold">Edit Profile Information</Text>
              <Input placeholder="Name" value={username} onChangeText={setUsername} />
              <Button onPress={onSave}>Save Changes</Button>
            </YStack>
          )}
          <Button bg={'black'} color={'white'} onPress={signOut}>Sign Out</Button>
        </YStack>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
