import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SBTeamStats } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';

export interface TeamStatsState {
  teamStats: SBTeamStats[]
}

const initialState: TeamStatsState = {
  teamStats: []
}

export const fetchTeamStats = createAsyncThunk<SBTeamStats[], undefined, { rejectValue: string }>('events/fetchTeamStats', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('TeamStats')
    .select('*')
    .returns<SBTeamStats[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

const teamStatsSlice = createSlice({
  name: 'team-stats',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchTeamStats.fulfilled, (state, action) => {
      return { ...state, teamStats: action.payload }
    })
  }
});

export default teamStatsSlice.reducer;