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

const selectByPerformer = (currentData: IConcert[], id: string) =>
  currentData.filter(c => c.performerId === id);
const selectByLocation = (currentData: IConcert[], id: string) =>
  currentData.filter(c => c.locationId === id);
const selectLessThanPrice = (currentData: IConcert[], price: number) =>
  currentData.filter(c => c.ticketPrice! < price);

export const getVisibleConcerts = createSelector(
  getVisibilityFilter,
  selectAllConcerts,
  (filter, concerts) => {
    if (filter.filterTicket) {
      concerts = selectLessThanPrice(concerts, filter.filterTicket);
    }
    if (filter.filterPerformer) {
      concerts = selectByPerformer(concerts, filter.filterPerformer);
    }
    if (filter.filterLocation) {
      concerts = selectByLocation(concerts, filter.filterLocation);
    }
    return concerts;
  },
);

export default concertSlice.reducer;
