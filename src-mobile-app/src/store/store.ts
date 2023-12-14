import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { useDispatch, useSelector, useStore } from "react-redux";

const persistConfig = { key: 'redux-root', storage: AsyncStorage };

const rootReducer = persistCombineReducers(persistConfig, {
  events: eventsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

// Only use the below functions inside a React component!!!
// You will have issues otherwise.
export const useTypedStore = () => useStore<RootState>();
export const useTypedDispatch = () => useDispatch<Dispatch>();
export const useTypedSelector = <T>(sfunc: (sel: RootState) => T) => useSelector<RootState, T>(state => sfunc(state));