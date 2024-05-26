import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Sheet } from '@tamagui/sheet';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Adapt, Button, H1, H2, Select, YStack, XStack, Text, useTheme} from 'tamagui';
import { SBTeam, Tables } from '../../lib/supabase-types';
import { EventsState, setActiveEvent } from '../../store/eventsSlice';
import { RootState, useTypedDispatch } from '../../store/store';
import { TeamsState, fetchTeams } from '../../store/teamsSlice';
import { LinearGradient } from 'tamagui/linear-gradient';
import React from 'react';
import { Text as RN_Text} from 'react-native';
import { ArrowLeft } from '@tamagui/lucide-icons'

import { supabase } from '../../lib/supabase';
import { fetchEvents } from '../../store/eventsSlice';
import { ScrollView as RN_ScrollView } from "react-native";

// Event Join Team here:
import TeamCard from '../teams/TeamCard';
import { setGestureState } from 'react-native-reanimated';
//


export default function EventDetailsSheet() {
  //
  const [showJoinOptions, setShowJoinOptions] = useState(true); // State to manage which join options to display
 //
  const [dragEnabled, setDragEnabled] = useState(true);

  const activeEvent = useSelector<RootState, EventsState>(state => state.eventsSlice).activeEvent;
  const eventTeams = useSelector<RootState, TeamsState>(state => state.teamsSlice).teams
    .filter(team => team.BelongsToEventID === activeEvent?.EventID);

  const dispatch = useTypedDispatch();
  //const { user, session } = useAuth();

  const[registrationStep, setRegistrationStep] = useState('options'); //state to manage the current registration step

  useEffect(() => {
    if (activeEvent)
      setEvent(activeEvent);

    dispatch(fetchTeams());
  }, [activeEvent]);

  useEffect(() => {
    console.log(eventTeams);
  }, [eventTeams]);

  const [event, setEvent] = useState<Tables<'Events'>>();
  const [teamID, setTeamID] = useState<string>('New');
  const [selectedTeam, setSelectedTeam] = useState<Tables<'Teams'> | null>(null); // State to store selected team

  const registrationOptions = async () => {
    setShowJoinOptions(false);
    setDragEnabled(false);
    
    eventTeams.forEach((team) => {
      console.log(`- ${team.Name}`); // Print each team's name on a new line with a bullet
    });
  }

  const scrollHandling = () => {
    if(!dragEnabled){
      return true;
    }
    return false;
  }

  const handleBack = () => {
    setShowJoinOptions(true); // Close the modal by setting activeEvent to null
    setDragEnabled(true);
  };

  
  //put join event logic here:
  //
  //console.log('Joined Event');
  

  return (
    <Sheet
      native 
      modal
      animation="medium"
      open={activeEvent !== null}
      dismissOnSnapToBottom
      disableDrag={!dragEnabled}

      onOpenChange={(open: boolean) => { if (!open) dispatch(setActiveEvent(null)); setDragEnabled(true); }}
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Frame /* ai="center" jc="center" */>
        <Sheet.Handle />

        <YStack>
          <YStack paddingBottom="$12" paddingTop="0%" alignItems="center">
            {showJoinOptions ? ( //Conditionally render join options
              <>
                <H2 paddingBottom="$3">Registration</H2>
                <Text color="white" paddingBottom="$12">- Select an option to register for a team -</Text>
                <XStack justifyContent="center" paddingBottom="$20">
                  <Button
                    /* Join Team Button */
                    bg={'#eb7434'} 
                    color={'white'} 
                    height="$13"
                    width="$12"
                    marginRight="$3"
                    fontSize="$8"
                    onPress={registrationOptions}
                  >
                    Join
                  </Button>

                  <Button
                    bg={'#eb7434'} 
                    color={'white'} 
                    height="$13"
                    width="$12"
                    marginLeft="$3"
                    fontSize="$8"
                    onPress={}
                  >
                    Create
                  </Button>
                </XStack>
              </>
            ) : (
              <YStack width="100%">
                <XStack width="100%" alignItems='center' paddingBottom="$3">
                  <XStack alignItems='center' paddingRight="10%">

                    <Button 
                      icon={<ArrowLeft size="$2"/>} 
                      padding="$2" 
                      marginLeft="$2"
                      marginRight="$2"
                      backgroundColor={"$backgroundTransparent"}
                      onPress={handleBack}
                    >
                      
                    </Button>
                  </XStack>

                  <XStack paddingLeft="$6" >
                      <Text fontSize="$7" >Available Teams</Text>
                  </XStack>

                </XStack>

                
                <YStack justifyContent='space-between'

                >
                  <RN_ScrollView>
                    {eventTeams.map(team => <TeamCard key={team.TeamID} team={team} /> )}
                  </RN_ScrollView>

                </YStack>

                
              </YStack>
            )}
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}