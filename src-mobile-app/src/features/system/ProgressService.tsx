import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { useAuth } from '../../lib/auth';

export default function ProgressService() {
  const { session } = useAuth();
  const [pastStepCount, setPastStepCount] = useState(0);

  const uploadSteps = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    console.log('Pedometer is available:', isAvailable);

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
        console.log('Past step count', pastStepCount);
      }
    }
  };

  useEffect(() => {
    if (session) uploadSteps();
  }, [session]);

  return null;
}