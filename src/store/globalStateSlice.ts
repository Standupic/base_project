import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum STATUS_APPLICATION {
  Error = 'Error',
  Success = 'Success',
}

export enum ACCESS_APPLICATION {
  NoRight = 'NoRight',
  NeedOriginalReference = 'NeedOriginalReference',
  ToApply = 'ToApply',
  BestYears = 'BestYears',
  DataWrong = 'DataWrong',
}

export interface InitData {
  previousYear: number;
  beforePreviousYear: number;
}

export interface IFile {
  base64: string;
  cert?: string;
  singBase64?: string;
  fileName?: string;
}

export interface GlobalState {
  statusApplication: STATUS_APPLICATION | undefined;
  accessApplication: ACCESS_APPLICATION | undefined;
  initLoading: boolean;
}

const initialState: GlobalState = {
  statusApplication: STATUS_APPLICATION.Success,
  accessApplication: undefined,
  initLoading: true,
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setStatusApplication: (
      state: GlobalState,
      action: PayloadAction<STATUS_APPLICATION | undefined>,
    ) => {
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
export const { setStatusApplication, reset } = globalStateSlice.actions;
export default globalStateSlice.reducer;
