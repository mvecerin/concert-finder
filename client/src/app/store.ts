import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import concertReducer from '../features/concert/concertSlice';
import locationReducer from '../features/locations/locationSlice';
import performerReducer from '../features/performers/performerSlice';
import userReducer from '../features/user/userSlice';

const combinedReducer = combineReducers({
  concerts: concertReducer,
  user: userReducer,
  locations: locationReducer,
  performers: performerReducer,
});

// Reset store after sign out
const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logOut') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
