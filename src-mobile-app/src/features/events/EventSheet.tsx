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

import { supabase, useAuth } from '../../lib/supabase';

export default function EventDetailsSheet() {
  const activeEvent = useSelector<RootState, EventsState>(state => state.eventsSlice).activeEvent;
  const eventTeams = useSelector<RootState, TeamsState>(state => state.teamsSlice).teams
    .filter(team => team.BelongsToEventID === activeEvent?.EventID);

  const dispatch = useTypedDispatch();
  const { user, session } = useAuth();

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

  const joinTeamCallback = React.useCallback(() => {
    const joinEvent = async () => {
      if (teamID === 'New') {
        const createTeamResult = await supabase
          .from('Teams')
          .upsert({
            Name: session!.user.email!,
            BelongsToEventID: event!.EventID
          })
          .select()
          .single();

        if (createTeamResult.error) {
          console.log(createTeamResult.error);
          return;
        }

        const joinTeamResult = await supabase
          .from('TeamsProfiles')
          .upsert({
            ProfileID: session!.user.id,
            TeamID: createTeamResult.data.TeamID
          })
          .select()
          .single();

        if (joinTeamResult.error) {
          console.log(joinTeamResult.error);
          return;
        }
      } else {
        const joinTeamResult = await supabase
          .from('TeamsProfiles')
          .upsert({
            ProfileID: session!.user.id,
            TeamID: teamID
          })
          .select()
          .single();

        if (joinTeamResult.error) {
          console.log(joinTeamResult.error);
          return;
        }
      }

      console.log('Joined Event');
    }

    joinEvent();
  }, [session, teamID]);

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

        <YStack gap="$4">
          <YStack 
            // borderColor="white" 
            paddingBottom="$12"
            paddingTop="$2" 
            alignItems="center"
            >
            <H2 paddingBottom="$3">Registration</H2>
            <Text color="white">- Select an option to register for a team -</Text>

          </YStack>
          
          <XStack 
            // borderColor="white" 
            justifyContent="center"
            paddingBottom="$20"
            >
            
            <Button
              /* Join Team Button */
              bg={'#eb7434'} 
              color={'white'} 
              /* onPress={joinTeamCallback} */ 
              height="$13"
              width="$12"
              marginRight="$3"
              fontSize="$8"
              >Join</Button>

            <Button
              /* Create Team Button */
              bg={'#eb7434'} 
              color={'white'} 
              /* onPress={createTeamCallback} */
              height="$13"
              width="$12"
              marginLeft="$3"
              fontSize="$8"
              onPress={joinTeamCallback}
              >Create</Button>
          </XStack>

        </YStack>

        {/* <Button
          size="$6"
          circular
          icon={ChevronDown}
          onPress={() => dispatch(setActiveEvent(null))}
        /> */}

      </Sheet.Frame>
    </Sheet>
  )
  




}