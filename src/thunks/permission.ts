import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

export interface IPermission {
  authApprove: boolean;
  authCreate: boolean;
  authDisplay: boolean;
  serviceDesc: string;
  serviceID: string;
  serviceName: string;
}

export const getPermissions = createAsyncThunk<IPermission[], never, { rejectValue: string }>(
  'user/permissions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        'sap/opu/odata4/sap/zhrbc/default/sap/zhrbc_0720_react_utils/0001/IService',
      );
      return data.value;
    } catch (e) {
      return rejectWithValue('Не удалось получить доступы!');
    }
  },
);

export default getPermissions;
