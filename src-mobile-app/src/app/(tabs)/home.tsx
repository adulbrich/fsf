import { useSelector } from "react-redux";
import { Button, YStack, useTheme, H4, XStack, ScrollView, H3, H2, H5, Text, View, CardProps, Card , Image} from "tamagui";
import { fetchTeamStatsBreakdown, selectMyTeamStats } from "../../store/teamStatsSlice";
import { SafeAreaView, StyleSheet} from "react-native";
import { useTypedDispatch, useTypedSelector } from "../../store/store";
import { selectEvents } from "../../store/eventsSlice";
import { useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useAssets } from "expo-asset";
import { SBEvent, SBTeamStats } from "../../lib/supabase-types";
import { selectMyProfile } from "../../store/profilesSlice";
import { selectMyProfileStats } from "../../store/profileStatsSlice";
import { useAuth } from "../../features/system/Auth";



export default function Home() {
  const theme = useTheme();
  const myTeamStats = useSelector(selectMyTeamStats);
  const events = useTypedSelector(selectEvents);
  const dispatch = useTypedDispatch();
  const myProfileStats = useTypedSelector(selectMyProfileStats);
  const { user, session } = useAuth();
  const all_team_stats = useTypedSelector(store => store.teamStatsSlice.teamStats);
  //const all_team_stats_breakdown = useTypedSelector(store => store.teamStatsSlice.teamStatsBreakdown);
  //console.log(all_team_stats);

  //sort all of the team based on TotalScore attribute
  // Create a copy of all_team_stats before sorting
  const newAllTeamStats_sorted = [...all_team_stats];
  
  // Sort the new array
  newAllTeamStats_sorted.sort((a, b) => b.TotalScore - a.TotalScore);

  const huh = myTeamStats[0].TeamID
  let index = 0;
  for(let i = 0; i < newAllTeamStats_sorted.length; i++) {
    if(newAllTeamStats_sorted[i].TeamID === huh) {
      index = i + 1;
      break;
    }
  }

  //console.log('myprofile', myProfileStats);
  //console.log('myteamstats', myTeamStats);

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
      <ScrollView height={'100%'} padding="$3">
        {/* Header*/}
       <H2 style={{textAlign: 'center'}}>Welcome, {useTypedSelector(selectMyProfile)?.Name}</H2>

        {/* Main Container */}
        <YStack  justifyContent="center" alignItems="center" width={"100%"} flex={1} gap="$10">
          
          {/* Current Event */}
          {vm.map(ts => (

             <YStack alignSelf="flex-start" marginTop="$2" width={"90%"} >

                <H3 alignSelf="flex-start" marginBottom="$2" style={{textAlign: 'center'}}>Current Event</H3>
                <XStack borderRadius={15} backgroundColor={theme.background.get()} width={"100%"} shadowColor="black" shadowRadius={1} shadowOffset={{width: 1, height: 1}} shadowOpacity={0.5} >
                  <Image
                    width={85}
                    height={85}
                    borderRadius={15}
                    source={assets ? assets[0] : require('../../../assets/images/preview_wide.jpg')}>
                  </Image>
                  <YStack marginLeft="$2" width={"100%"}>
                    <H4 fontSize="$6" alignSelf="flex-start" margin="$1" style={{textAlign: 'center'}}>{ts.Event?.Name}</H4>
                    <Text color={'#D73F09'} alignSelf="flex-start" margin="$1" style={{textAlign: 'center'}}>{Math.floor(Math.abs(new Date(ts.Event?.EndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days reamaining</Text>
                  </YStack>

               </XStack>

                {/* Team and Individual Scores */}
                <YStack marginTop="$5">
                  <XStack>
                    <H4>Your Score    </H4>
                    <H4 color={'#D73F09'}>{myProfileStats?.TotalScore}</H4>
                  </XStack>
                  <XStack marginTop="$3">
                    <H4>Team Score    </H4>
                    <H4 color={'#D73F09'}>{ts.TotalScore}</H4>
                  </XStack>
                </YStack>

                {/* Leaderboard show top 3 teams and their scores and placement*/}
                <H3 margin="$5"  alignSelf='center' style={{textAlign: 'center'}}>Leaderboard</H3>

                <YStack width={"95%"}>
                  {newAllTeamStats_sorted === 0 ? <Text>No data yet</Text> : null}

                  {newAllTeamStats_sorted.slice(0, 3).map(ts => (
                    
                    
                    <XStack marginBottom="$5" width={"100%"} justifyContent="space-between">
                      {/* Idealy the teams banner should be in place here but placeholder for now... */}
                      <Image
                        width={20}
                        height={20}
                        borderRadius={50}
                        alignSelf="center"
                        marginRight="$2"
                        source={assets ? assets[0] : require('../../../assets/images/preview_wide.jpg')}>
                      </Image>
                      {/* The current place of the team */}
                      <Text alignSelf="center">{newAllTeamStats_sorted.indexOf(ts) + 1} </Text>
                      <XStack width={"100%"}>
                        <XStack width={"100%"} justifyContent="space-between">
                         <Text>{ts.Name}</Text>
                         <Text>{ts.TotalScore}</Text>
                        </XStack>
                     </XStack>
                    </XStack>


                  ))}

                  
                  
                  {/* Show the Current Place of the users team and their score */}
                  <XStack padding="$2" borderRadius={15} backgroundColor={"#FBCEB1"} marginBottom="$3" width={"100%"}>
                     {/* Idealy the teams banner should be in place here but placeholder for now... */}
                     <Image
                        width={20}
                        height={20}
                        borderRadius={50}
                        alignSelf="center"
                        marginRight="$2"
                        source={assets ? assets[0] : require('../../../assets/images/preview_wide.jpg')}>
                      </Image>
                      {/* The place of the team of the currently logged in user*/}
                      <Text alignSelf="center">{index}</Text>
                      <XStack height={"100%"} borderRadius={15} backgroundColor={"#FBCEB1"} marginLeft="$1.5" width={"100%"}>
                        <XStack padding="$2" width={"100%"} justifyContent="space-between">
                         <Text>{myTeamStats[0]?.TeamName}</Text>
                         <Text color={'#D73F09'}>{myTeamStats[0]?.TotalScore}</Text>
                        </XStack>
                     </XStack>



                  </XStack>

                      

                </YStack>


            </YStack>
          ))}

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );

}