import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import { SBTeamStats, TeamStats } from '../lib/models';
import { RootState } from './store';
import { selectUserID } from './systemSlice';

export interface TeamStatsState {
  teamStats: SBTeamStats[]
  teamStatsBreakdown: TeamStats[]
}

const initialState: TeamStatsState = {
  teamStats: [],
  teamStatsBreakdown: []
}

export const fetchTeamStats = createAsyncThunk<SBTeamStats[], undefined, { rejectValue: string }>('events/fetchTeamStats', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('TeamStats')
    .select('*')
    .returns<SBTeamStats[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});


export const fetchTeamStatsBreakdown = createAsyncThunk<TeamStats[], undefined, { rejectValue: string }>(
  'events/fetchTeamStatsBreakdown',
  async (_, { rejectWithValue, getState }) => {
    const userID = (getState() as RootState).systemSlice.userID;
    if (!userID) return rejectWithValue('User ID not found');

    const { data, error } = await supabase
      .from('TeamStatsBreakdown')
      .select('*');

    if (error) return rejectWithValue(error.message);

    const teamIDs = new Set(data.filter(ts => ts.TeamID !== null).map(ts => ts.TeamID!));
    const teamStats: TeamStats[] = [];

    for (const teamID of teamIDs) {
      const profileStats = data.filter(ts => ts.TeamID === teamID);
      const teamTotal = profileStats.reduce((acc, t) => acc + (t.TotalScore ?? 0), 0);
      teamStats.push({
        TeamName: profileStats[0].TeamName!,
        TeamID: teamID,
        TotalScore: teamTotal,
        EventID: profileStats[0].EventID!,
        Profiles: [...profileStats.map(ps => ({
          ProfileID: ps.ProfileID!,
          TotalScore: ps.TotalScore ?? 0,
          ProfileName: ps.ProfileName!
        }))]
      });
    }

    return teamStats;
  }
);

const teamStatsSlice = createSlice({
  name: 'team-stats',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchTeamStats.fulfilled, (state, action) => {
      return { ...state, teamStats: action.payload }
    });
    builder.addCase(fetchTeamStatsBreakdown.fulfilled, (state, action) => {
      return { ...state, teamStatsBreakdown: action.payload }
    });
  }
});

export default teamStatsSlice.reducer;

// Select this slice
const selectSelf = (state: RootState) => state.teamStatsSlice;

export const selectTeamStats = createSelector(
  selectSelf,
  state => state.teamStats
);

export const selectTeamStatsBreakdown = createSelector(
  selectSelf,
  state => state.teamStatsBreakdown
);

export const selectMyTeamStats = createSelector(
  selectTeamStatsBreakdown,
  selectUserID,
  (teamStatsBreakdown, userID) => teamStatsBreakdown
    .filter(t => t.Profiles
    .find(p => p.ProfileID === userID) !== undefined)
);