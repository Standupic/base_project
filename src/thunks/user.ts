import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'juicyfront/types/projects.types';
import Axios from '../api/interceptor';

const getUser = createAsyncThunk<IUser, never, { rejectValue: string }>(
  'users/getUser',
  async (_, api) => {
    try {
      const user = await Axios.get(
        'sap/opu/odata4/sap/zhrbc/default/sap/zhrbc_0720_react_utils/0001/IUser(%270%27)',
      );
      return user.data;
    } catch (e) {
      return api.rejectWithValue('Не удалось получить пользователя!');
    }
  },
);

export default getUser;
