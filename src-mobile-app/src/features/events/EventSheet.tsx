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

import { supabase, useAuth } from '../../lib/supabase';
import { fetchEvents } from '../../store/eventsSlice';

export default function EventDetailsSheet() {
  //
  const [showJoinOptions, setShowJoinOptions] = useState(true); // State to manage which join options to display
 //
  const activeEvent = useSelector<RootState, EventsState>(state => state.eventsSlice).activeEvent;
  const eventTeams = useSelector<RootState, TeamsState>(state => state.teamsSlice).teams
    .filter(team => team.BelongsToEventID === activeEvent?.EventID);

  const dispatch = useTypedDispatch();
  const { user, session } = useAuth();

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


  const registrationOptions = async () => {
    setShowJoinOptions(false);
    console.log("Displaying registration options");




  }

  const fetchTeamsByEvent = async (EventID) => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('event_id', EventID); // Filter teams by event_id
    if (error) {
      console.error('Error fetching teams:', error.message);
      return [];
    }
    return data || [];
  };
  
  const handleBack = () => {
    setShowJoinOptions(true); // Close the modal by setting activeEvent to null
  };

  //joinEvent();

  return (
    <Sheet
      native 
      modal
      animation="medium"
      open={activeEvent !== null}
      dismissOnSnapToBottom
      onOpenChange={(open: boolean) => { if (!open) dispatch(setActiveEvent(null)) }}
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
                    /* Create Team Button */
                    bg={'#eb7434'} 
                    color={'white'} 
                    /* onPress={createTeamCallback} */
                    height="$13"
                    width="$12"
                    marginLeft="$3"
                    fontSize="$8"
                  >
                    Create
                  </Button>
                </XStack>
              </>
            ) : (
              <YStack width="100%">
                <XStack marginTop="$0" width="$16">
                  <Button 
                    icon={<ArrowLeft size="$2"/>} 
                    fontSize="$6" 
                    padding="$2" 
                    marginLeft="$2"
                    backgroundColor={"$backgroundTransparent"}
                    onPress={handleBack}
                  >
                    Registration Options
                  </Button>
                </XStack>
                <YStack height="85%" borderWidth="$0.5" backgroundColor="#898A8D" margin="$4" borderRadius="$5">

                </YStack>
                
              </YStack>
              
              
              //<Text color="green">You have successfully joined the event!</Text> //success message</Sheet.Frame>
            )}
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}