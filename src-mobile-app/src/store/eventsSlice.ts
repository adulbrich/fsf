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
}

const initialState: EventsState = {
  activeEvent: null,
  events: [],
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
    })
  }
});

export const { setActiveEvent, setSelectedStatus } = eventsSlice.actions;
export default eventsSlice.reducer;

export const selectFilteredEvents = createSelector(
  (state: RootState) => state.events.events,
  (state: RootState) => state.events.selectedStatus,
  (events, status) => {
    return filterSBEventsByStatus(events, status);
  }
);