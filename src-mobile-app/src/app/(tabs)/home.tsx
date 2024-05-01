import { useSelector } from "react-redux";
import { Button, YStack, useTheme, H4, XStack, ScrollView, H3, H2, Text, View, CardProps, Card , Image} from "tamagui";
import { fetchTeamStatsBreakdown, selectMyTeamStats } from "../../store/teamStatsSlice";
import { SafeAreaView, StyleSheet} from "react-native";
import { Text as RN_Text } from "react-native";
import { useTypedDispatch, useTypedSelector } from "../../store/store";
import { selectEvents } from "../../store/eventsSlice";
import { useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useAssets } from "expo-asset";

export default function Home() {
  const theme = useTheme();
  const myTeamStats = useSelector(selectMyTeamStats);
  const events = useTypedSelector(selectEvents);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTeamStatsBreakdown());
  }, []);

  const vm = myTeamStats.map(ts => ({
      ...ts,
      Event: events.find(ev => ev.EventID === ts.EventID)
  }));
  
  const [assets] = useAssets([
    require('../../../assets/images/preview_wide.jpg')
  ]);

  return (
    <SafeAreaView>
      <ScrollView height={'100%'} padding="$4">
        <YStack justifyContent="center" alignItems="center" flex={1} gap="$4" marginBottom="$4">
          
          {vm.map(ts => (
            <Card
             animation="bouncy"
             size="$3"
             width={'95%'}
             height={350}
             scale={0.9}
             pressStyle={{scale: 0.875}} 
             backgroundColor={theme.gray5}
             borderColor={theme.gray6}
             padding="$5"
             borderRadius={15}
             key={ts.TeamID}>

            <YStack flex={1}>
                <Card.Header><H3 style={{textAlign: 'center'}}>{ts.Event?.Name}</H3></Card.Header>
                {assets && (

                    <Image
                      width={'95%'}
                      height={'50%'}
                      resizeMode="stretch"
                      borderRadius={10}
                      alignSelf="center"
                      marginBottom="$5"
                      source={{ uri: assets[0].uri, width: assets[0].width!, height: assets[0].height! }}
                    />

                )}
            </YStack>
          
            <YStack height={100} gap="$3" marginBottom="$4">
              <XStack justifyContent="space-between" alignItems="flex-end">
                <H4>{ts.TeamName}</H4>
                <H4>{ts.TotalScore}</H4>
              </XStack>

              <View width={'100%'} height={1} backgroundColor={'$gray10'} />
                
                {ts.Profiles.slice(0,2).map(ps => (
                  <XStack justifyContent="space-between" key={ps.ProfileID} alignItems="flex-end">
                    <Text>{ps.ProfileName}</Text>
                    <Text>{ps.TotalScore}</Text>
                  </XStack>
                ))}
                
              {ts.Profiles.length > 2 && <Text>...</Text>}

            </YStack>


            </Card>
          ))}

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );

}