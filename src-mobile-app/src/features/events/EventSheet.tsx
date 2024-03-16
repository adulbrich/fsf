import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Sheet } from '@tamagui/sheet';
import { useEffect, useMemo, useState } from 'react';
import { Adapt, Button, H3, Select, Theme, YStack } from 'tamagui';
import { fetchEvents, selectActiveEvent, setActiveEvent } from '../../store/eventsSlice';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import { fetchTeams, selectTeams } from '../../store/teamsSlice';
import { LinearGradient } from 'tamagui/linear-gradient';
import React from 'react';
import { useAuth } from '../system/Auth';
import { fetchTeamStats, fetchTeamStatsBreakdown } from '../../store/teamStatsSlice';
import { SBEvent } from '../../lib/models';
import { supabase } from '../../lib/supabase';

export default function EventDetailsSheet() {
  const activeEvent = useTypedSelector(selectActiveEvent);
  const eventTeams = useTypedSelector(selectTeams)
    .filter(team => team.BelongsToEventID === activeEvent?.EventID);

  const dispatch = useTypedDispatch();
  const { user, session } = useAuth();

  const [event, setEvent] = useState<SBEvent | null>();
  const [teamID, setTeamID] = useState<string>('New');

  useEffect(() => {
    setEvent(activeEvent);
      
    dispatch(fetchTeams())
  }, [activeEvent]);

  async function joinTeam(eventID: string, joinTeamID: string | null) {
    console.log(eventID);
    if (joinTeamID === 'New' || joinTeamID === null) {
      
      const createTeamResult = await supabase
        .from('Teams')
        .upsert({
          Name: session!.user.email!,
          BelongsToEventID: eventID 
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
          TeamID: joinTeamID
        })
        .select()
        .single();

      if (joinTeamResult.error) {
        console.log(joinTeamResult.error);
        return;
      }
    }

    dispatch(setActiveEvent(null));
    await dispatch(fetchEvents());
    await dispatch(fetchTeams());
    await dispatch(fetchTeamStats());
    await dispatch(fetchTeamStatsBreakdown());
  }


  const joinTeamCallback = React.useCallback(() => {
    if (activeEvent === null) return;
    joinTeam(activeEvent.EventID, teamID);
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
      <Sheet.Frame alignItems="center" justifyContent="flex-start">
        <Sheet.Handle />

        <YStack gap="$4" width={'100%'} padding="$6">
          <H3>Select a team</H3>
          <Select value={teamID} onValueChange={setTeamID} disablePreventBodyScroll>
            {/* Theme reset stops a warning from popping up, NO idea why */}
            <Theme reset>
              <Select.Trigger width={220} iconAfter={ChevronDown}>
                <Select.Value placeholder="Select a team..." />
              </Select.Trigger>
            </Theme>
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
                snapPoints={[50]}
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

          <Button bg={'#eb7434'} color={'white'} onPress={joinTeamCallback}>Join</Button>
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