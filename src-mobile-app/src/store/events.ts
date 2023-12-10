import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tables } from '../lib/supabase-types';

export interface EventsState {
  activeEvent: Tables<'Events'> | null
}

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    activeEvent: null
  } as EventsState,
  reducers: {
    setActiveEvent: (state, action: PayloadAction<Tables<'Events'> | null>) => {
      state.activeEvent = action.payload;
    }
  }
});

export const { setActiveEvent } = eventsSlice.actions;
export default eventsSlice.reducer;