import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SBProfileStats } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';

export interface ProfileStatsState {
  profileStats: SBProfileStats[]
}

const initialState: ProfileStatsState = {
  profileStats: []
}

export const fetchProfileStats = createAsyncThunk<SBProfileStats[], undefined, { rejectValue: string }>('events/fetchProfileStats', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('ProfileStats')
    .select('*')
    .returns<SBProfileStats[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

const profileStatsSlice = createSlice({
  name: 'profile-stats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfileStats.fulfilled, (state, action) => {
      return { ...state, profileStats: action.payload }
    })
  }
});

export default profileStatsSlice.reducer;