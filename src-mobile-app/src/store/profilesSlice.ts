import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SBProfile } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';

export interface ProfilesState {
  profiles: SBProfile[]
}

const initialState: ProfilesState = {
  profiles: []
}

export const fetchProfiles = createAsyncThunk<SBProfile[], undefined, { rejectValue: string }>('events/fetchProfiles', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .returns<SBProfile[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return { ...state, profiles: action.payload }
    })
  }
});

export default profilesSlice.reducer;