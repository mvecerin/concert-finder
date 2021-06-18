import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {IConcertFull, ILocation} from '../../app/interfaces';
import {RootState} from '../../app/store';
import {getConcerts} from '../concert/concertSlice';

export const adapter = createEntityAdapter<ILocation>({
  selectId: location => location.id!,
});

const locationSlice = createSlice({
  name: 'location',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getConcerts.fulfilled, (state, {payload}) => {
      adapter.setAll(state, getLocations(payload));
    });
  },
});

const getLocations = (concerts: IConcertFull[]) =>
  _.uniqBy(
    concerts.map(concert => concert.location),
    location => location.id,
  );

export const {selectAll: selectAllLocations, selectById: selectLocationById} =
  adapter.getSelectors<RootState>(state => state.locations);

export default locationSlice.reducer;
