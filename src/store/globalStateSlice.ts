import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum STATUS {
  AsyncError = 'AsyncError',
  Error = 'Error',
  Success = 'Success',
}

export interface STATUS_APPLICATION {
  status: STATUS;
  message?: string;
  errorCode?: string;
}

export interface ACCESS_APPLICATION {
  access: ACCESS;
  message: string;
}

export enum ACCESS {
  Ok = 'Ok',
  NoRight = 'У Вас нет прав доступа',
}

export interface GlobalState {
  statusApplication: STATUS_APPLICATION;
  accessApplication: ACCESS_APPLICATION;
}

const initialState: GlobalState = {
  statusApplication: {
    status: STATUS.Success,
    message: '',
    errorCode: '',
  },
  accessApplication: {
    access: ACCESS.Ok,
    message: '',
  },
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setStatusApplication: (state: GlobalState, action: PayloadAction<STATUS_APPLICATION>) => {
      state.statusApplication = action.payload;
    },
    setAccessToApplication: (state: GlobalState, action: PayloadAction<ACCESS_APPLICATION>) => {
      state.accessApplication = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: {},
});
export const { setStatusApplication, reset, setAccessToApplication } = globalStateSlice.actions;
export default globalStateSlice.reducer;
