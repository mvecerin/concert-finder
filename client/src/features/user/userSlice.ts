import {
  createAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {logInAPI, signUpAPI, whoAmIAPI} from '../../app/api';
import {IUserCredentials, IUserState} from '../../app/interfaces';

const initialState: IUserState = {
  isAuth: false,
  user: null,
};

export const whoAmI = createAsyncThunk('user/whoAmI', async () => {
  try {
    return await (
      await whoAmIAPI()
    ).data.user;
  } catch (e) {
    localStorage.removeItem('token');
    return Promise.reject();
  }
});
export const logIn = createAsyncThunk(
  'user/logIn',
  async (data: IUserCredentials) => {
    try {
      const response = await logInAPI(data);
      if (response.data.token)
        localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (e) {
      return Promise.reject(e);
    }
  },
);
export const signUp = createAsyncThunk(
  'user/signUp',
  async (data: IUserCredentials) => {
    try {
      return await (
        await signUpAPI(data)
      ).data;
    } catch (e) {
      return Promise.reject();
    }
  },
);
export const userLogOut = createAction('user/logout');

export const logOut = () => {
  localStorage.removeItem('token');
  return userLogOut();
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(logIn.fulfilled, whoAmI.fulfilled),
        (state, {payload}) => {
          state.isAuth = true;
          state.user = payload;
        },
      )
      .addMatcher(isAnyOf(whoAmI.rejected, userLogOut), state => {
        state.isAuth = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
