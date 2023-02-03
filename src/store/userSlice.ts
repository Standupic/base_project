import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'juicyfront/types/projects.types';
import authorization from '../thunks/authorization';
import { reset } from './globalStateSlice';

export interface UserState {
  loading: boolean;
  userLoaded: boolean;
  error: undefined | string[];
  user: IUser | undefined | string;
}

const initialState: UserState = {
  loading: true,
  userLoaded: false,
  error: undefined,
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authorization.fulfilled, (state, action) => {
      sessionStorage.setItem('CSRF', action.payload.token);
      state.user = action.payload.user;
      state.loading = false;
      state.userLoaded = true;
    });
    builder.addCase(authorization.rejected, (state, action) => {
      console.log('reject');
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(reset, () => {
      return initialState;
    });
  },
});

export default userSlice.reducer;
