import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import { RootState } from './store';
import { Pedometer } from 'expo-sensors';
import { fetchProfileStats } from './profileStatsSlice';
import { fetchTeamStats, fetchTeamStatsBreakdown } from './teamStatsSlice';
import { fetchEventStats } from './eventStatsSlice';
import { SBProgress } from '../lib/models';

export interface ProgressSlice {
  progress: SBProgress[]
  myProgress: SBProgress[]
  myLatestProgress: SBProgress[]
}

const initialState: ProgressSlice = {
  progress: [],
  myProgress: [],
  myLatestProgress: []
}

export const fetchProgress = createAsyncThunk<SBProgress[], undefined, { rejectValue: string }>('events/fetchProgress', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('ActivityProgress')
    .select('*')
    .returns<SBProgress[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

export const syncMyActivity = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'events/syncMyActivity',
  async (_, { rejectWithValue, getState, dispatch }) => {
    // Extract user ID from system slice
    const userID = (getState() as RootState).systemSlice.userID;

    const pedomAvailable = await Pedometer.isAvailableAsync();
    if (!userID) return rejectWithValue('User ID not found');
    if (!pedomAvailable) return rejectWithValue('Pedometer not available');

    const { data: progressLog, error } = await supabase
      .from('ActivityProgressLog')
      .select(`
        *
      `)
      .eq('ProfileID', userID)
      .lt('EventStartsAt', new Date().toISOString())
      .gt('EventEndsAt', new Date().toISOString())
      .not('TeamID', 'is', null)
      .not('EventStartsAt', 'is', null)
      .not('EventEndsAt', 'is', null)

    if (error) return rejectWithValue(error.message);

    const currentDate = new Date();

    // Loop through each event and update
    for (const log of progressLog ?? []) {
      // Get event end date
      const eventEndsDate = new Date(log.EventEndsAt!);
      // Start date is either the latest activity date or the event start date
      const pedomStartDate = log.LatestActivityDate === null ? new Date(log.EventStartsAt!) : new Date(log.LatestActivityDate);
      // End date is either the current date or the event end date, whichever is earlier
      const pedomEndDate = currentDate > eventEndsDate ? eventEndsDate : currentDate;

      const { steps } = await Pedometer.getStepCountAsync(
        pedomStartDate,
        pedomEndDate
      );

      if (steps === 0) continue;

      const { error } = await supabase
        .from('ActivityProgress')
        .insert({
          RawProgress: steps,
          ActivityType: 'Steps',
          BelongsToTeamID: log.TeamID!,
          CreatedByProfileID: userID
        });

      if (error) return rejectWithValue(error.message);
    }
  }
);

const progressSlice = createSlice({
  name: 'activity-progress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProgress.fulfilled, (state, action) => {
      return { ...state, progress: action.payload }
    });
  }
});

// Select this slice
const selectSelf = (state: RootState) => state.progressSlice;

export default progressSlice.reducer;