import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {IConcertFull, IPerformer} from '../../app/interfaces';
import {RootState} from '../../app/store';
import {getConcerts} from '../concert/concertSlice';

export const adapter = createEntityAdapter<IPerformer>({
  selectId: performer => performer.id!,
});

const performerSlice = createSlice({
  name: 'performer',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getConcerts.fulfilled, (state, {payload}) => {
      adapter.setAll(state, getPerformers(payload));
    });
  },
});

const getPerformers = (concerts: IConcertFull[]) =>
  _.uniqBy(
    concerts.map(concert => concert.performer),
    performer => performer.id,
  );

export const {selectAll: selectAllPerformers, selectById: selectPerformerById} =
  adapter.getSelectors<RootState>(state => state.performers);

export default performerSlice.reducer;
