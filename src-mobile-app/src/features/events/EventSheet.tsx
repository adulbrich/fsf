import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Sheet } from '@tamagui/sheet';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Adapt, Button, H1, H2, Select, YStack } from 'tamagui';
import { SBTeam, Tables } from '../../lib/supabase-types';
import { EventsState, setActiveEvent } from '../../store/eventsSlice';
import { RootState, useTypedDispatch } from '../../store/store';
import { TeamsState, fetchTeams } from '../../store/teamsSlice';
import { LinearGradient } from 'tamagui/linear-gradient';
import React from 'react';
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
      <Sheet.Frame ai="center" jc="center">
        <Sheet.Handle />

        <YStack gap="$4">
          <H2>Select a team</H2>
          <Select value={teamID} onValueChange={setTeamID} disablePreventBodyScroll>
            <Select.Trigger width={220} iconAfter={ChevronDown}>
              <Select.Value placeholder="Select a team..." />
            </Select.Trigger>
            <Adapt when="sm" platform="touch">
              <Sheet
                native={true}
                modal
                dismissOnSnapToBottom
                animationConfig={{
                  type: 'spring',
                  damping: 20,
                  mass: 1.2,
                  stiffness: 250,
                }}
              >
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Sheet>
            </Adapt>
            <Select.Content zIndex={200000}>
          
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={['$background', 'transparent']}
                  borderRadius="$4"
                />
              </Select.ScrollUpButton>
              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>Teams</Select.Label>
                  <Select.Item index={-1} key={-1} value={'New'}>
                    <Select.ItemText>Start new team</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  {useMemo(() => eventTeams.map((team, i) => (
                    <Select.Item index={i} key={team.TeamID} value={team.TeamID}>
                      <Select.ItemText>{team.Name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )), [eventTeams])}
          
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={['transparent', '$background']}
                  borderRadius="$4"
                />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>

          <Button onPress={joinTeamCallback}>Join</Button>
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