import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { SBProfile } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';
import { RootState } from './store';
import { selectUserID } from './systemSlice';

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

// Select this slice
const selectSelf = (state: RootState) => state.profilesSlice;

// Select the current user profile
export const selectUserProfile = createDraftSafeSelector(
  selectSelf,
  selectUserID,
  (state, userID) => state.profiles.find(profile => profile.ProfileID === userID)
);

export default profilesSlice.reducer;