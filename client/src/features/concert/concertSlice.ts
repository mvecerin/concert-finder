import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  addConcertAPI,
  deleteConcertAPI,
  editConcertAPI,
  getConcertsAPI,
} from '../../app/api';
import {IConcert, IConcertFull, IFilter} from '../../app/interfaces';
import {RootState} from '../../app/store';

export const adapter = createEntityAdapter<IConcert>({
  selectId: concert => concert.id!,
});

export const getConcerts = createAsyncThunk('concert/getConcerts', async () => {
  try {
    return await (
      await getConcertsAPI()
    ).data;
  } catch (e) {
    return Promise.reject();
  }
});
export const editConcert = createAsyncThunk(
  'concert/editConcert',
  async (data: IConcert) => {
    try {
      await editConcertAPI(data);
      data.date = data.date.toString();
      return data;
    } catch (e) {
      return Promise.reject();
    }
  },
);
export const addConcert = createAsyncThunk(
  'concert/addConcert',
  async (data: IConcert) => {
    try {
      return await (
        await addConcertAPI(data)
      ).data;
    } catch (e) {
      return Promise.reject();
    }
  },
);
export const deleteConcert = createAsyncThunk(
  'concert/deleteConcert',
  async (_id: string) => {
    try {
      await deleteConcertAPI(_id);
      return _id;
    } catch (e) {
      return Promise.reject();
    }
  },
);

const concertSlice = createSlice({
  name: 'concert',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getConcerts.fulfilled, (state, {payload}) => {
        const data = payload.map((concert: IConcertFull) => {
          const {location, performer, ...rest} = concert;
          const data = {
            ...rest,
            locationId: location.id,
            performerId: performer.id,
          };
          return data;
        });
        adapter.setAll(state, data);
      })
      .addCase(editConcert.fulfilled, (state, {payload}) => {
        //@ts-ignore
        adapter.updateOne(state, {id: payload.id, changes: payload});
      })
      .addCase(addConcert.fulfilled, (state, {payload}) => {
        adapter.addOne(state, payload);
      })
      .addCase(deleteConcert.fulfilled, (state, {payload}) => {
        //@ts-ignore
        adapter.removeOne(state, payload!);
      });
  },
});

export const {selectAll: selectAllConcerts, selectById: selectConcertById} =
  adapter.getSelectors<RootState>(state => state.concerts);

const getVisibilityFilter = (state: RootState, filter: IFilter) => filter;

export const getVisibleConcerts = createSelector(
  [getVisibilityFilter, selectAllConcerts],
  (visibilityFilter, concerts) => {
    let filtered = [...concerts];
    if (visibilityFilter.filterTicket) {
      filtered = filtered.filter(
        c => c.ticketPrice! < visibilityFilter.filterTicket,
      );
    }
    if (visibilityFilter.filterPerformer) {
      filtered = filtered.filter(
        c => c.performerId === visibilityFilter.filterPerformer,
      );
    }
    if (visibilityFilter.filterLocation) {
      filtered = filtered.filter(
        c => c.locationId === visibilityFilter.filterLocation,
      );
    }
    return filtered;
  },
);

export default concertSlice.reducer;
