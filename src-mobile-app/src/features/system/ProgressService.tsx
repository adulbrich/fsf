import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { useAuth } from './Auth';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import { SBEvent } from '../../lib/supabase-types';
import { fetchMyEvents } from '../../store/eventsSlice';

export default function ProgressService() {
  const { session } = useAuth();
  const [pastStepCount, setPastStepCount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const dispatch = useTypedDispatch();
  const relevantEvents = useTypedSelector<SBEvent[]>(state => state.eventsSlice.myEvents);

  const uploadSteps = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    console.log('Pedometer is available:', isAvailable);
    console.log('Relevant events', relevantEvents.length);

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 5);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
        console.log('Past step count', pastStepCount);
      }
    }
  };

  // Fetch relevant events
  useEffect(() => {
    if (fetching) return;
    setFetching(true);

    if (session && relevantEvents.length == 0) dispatch(fetchMyEvents());
  }, [session]);

  // Upload steps
  useEffect(() => {
    setFetching(false);
    if (session && relevantEvents.length > 0) uploadSteps();
  }, [relevantEvents]);

  return null;
}