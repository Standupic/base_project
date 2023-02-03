import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'juicyfront/types/projects.types';
import getUser from './user';
import getToken from './token';
import getPermissions, { IPermission } from './permission';

const authorization = createAsyncThunk<
  { user?: string | IUser; token: string; permission?: IPermission[] | string },
  any,
  { rejectValue: string[] | undefined }
>('authorization', async (_, api) => {
  const result = await Promise.all([
    api.dispatch(getUser()),
    api.dispatch(getToken()),
    api.dispatch(getPermissions()),
  ]);
  const filtered = result.filter((item: any) => item.error);
  if (filtered.length) {
    const errors = filtered.map((item) => item.payload);
    return api.rejectWithValue(errors);
  } else {
    return {
      user: result[0].payload,
      token: result[1].payload,
      permission: result[2].payload,
    };
  }
});

export default authorization;
