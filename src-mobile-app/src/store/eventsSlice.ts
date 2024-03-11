import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { SBEvent } from '../lib/supabase-types';
import { supabase } from '../lib/supabase';
import { RootState } from './store';

export enum SBEventStatus {
  UPCOMING,
  ONGOING,
  PAST
}

function filterSBEventsByStatus(events: SBEvent[], status: SBEventStatus): SBEvent[] {
  const currentTime = new Date().getTime();

  return events.filter(ev => {
    const eventStarts = new Date(ev.StartsAt).getTime();
    const eventEnds = new Date(ev.EndsAt).getTime();

    switch (status) {
      case SBEventStatus.UPCOMING:
        return currentTime < eventStarts;
      case SBEventStatus.ONGOING:
        return currentTime < eventEnds && currentTime > eventStarts;
      case SBEventStatus.PAST:
        return currentTime > eventEnds;
    }
  });
}

export interface EventsState {
  activeEvent: SBEvent | null
  events: SBEvent[]
  selectedStatus: SBEventStatus

  // Events that we can submit results for
  relevantEvents: SBEvent[]
}

const initialState: EventsState = {
  activeEvent: null,
  events: [],
  relevantEvents: [],
  selectedStatus: SBEventStatus.ONGOING
}

export const fetchEvents = createAsyncThunk<SBEvent[], undefined, { rejectValue: string }>('events/fetchEvents', async (_, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from('Events')
    .select('*')
    .returns<SBEvent[] | null>();
  if (error) return rejectWithValue(error.message);
  return data ?? [];
});

// Fetches events that are current and that the user is participating in
export const fetchRelevantEvents = createAsyncThunk<SBEvent[], undefined, { rejectValue: string }>(
  'events/fetchRelevantEvents',
  async (_, { rejectWithValue, getState }) => {
    console.log('fetchRelevantEvents()');
    // Extract user ID from system slice
    const userID = (getState() as RootState).systemSlice.userID;
    if (!userID) return rejectWithValue('User ID not found');

    // Find relevent events
    const { data, error } = await supabase
      .from('Profiles')
      .select(`*, Events(*)`)
      .eq('ProfileID', userID)
      .maybeSingle();

    if (error) return rejectWithValue(error.message);

    console.log('Relevant events', data?.Events.map(e => e.Name));

    return data?.Events.filter(
      e => new Date(e.StartsAt).getTime() < new Date().getTime() &&
           new Date(e.EndsAt).getTime()   > new Date().getTime()
    ) ?? [];
  }
);

// Create the events slice
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      return { ...state, events: action.payload }
    });

    builder.addCase(fetchRelevantEvents.fulfilled, (state, action) => {
      return { ...state, relevantEvents: action.payload }
    });
  }
});

// Actions and reducers
export const { setActiveEvent, setSelectedStatus } = eventsSlice.actions;
export default eventsSlice.reducer;

// Selectors
export const selectFilteredEvents = createSelector(
  (state: RootState) => state.eventsSlice.events,
  (state: RootState) => state.eventsSlice.selectedStatus,
  (events, status) => {
    return filterSBEventsByStatus(events, status);
  }
);