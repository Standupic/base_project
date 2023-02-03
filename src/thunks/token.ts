import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/interceptor';

const getToken = createAsyncThunk<any, never, { rejectValue: string }>(
  'user/getToken',
  async (_, { rejectWithValue }) => {
    try {
      const { headers } = await Axios.get(
        'sap/opu/odata4/sap/zlocal_service/default/sap/zhrbc_0720_react_utils/0001/IXCSRFToken',
        {
          headers: {
            'X-CSRF-Token': 'Fetch',
            // @ts-ignore
            ['cacheURL']: true,
          },
        },
      );
      return headers['x-csrf-token'];
    } catch (e) {
      return rejectWithValue('Не удалось получить токен!');
    }
  },
);

export default getToken;
