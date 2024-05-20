import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import { SBEventStats } from '../lib/models';

export interface EventStatsState {
  eventStats: SBEventStats[]
}

const initialState: EventStatsState = {
  eventStats: []
}

export const fetchEventStats = createAsyncThunk<SBEventStats[], undefined, { rejectValue: string }>('events/fetchEventStats', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('EventStats')
    .select('*')
    .returns<SBEventStats[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

const eventStatsSlice = createSlice({
  name: 'events-stats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEventStats.fulfilled, (state, action) => {
      return { ...state, eventStats: action.payload }
    })
  }
});

export default eventStatsSlice.reducer;