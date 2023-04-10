import { createListenerMiddleware, isAnyOf, isRejectedWithValue } from '@reduxjs/toolkit';
import {
  ACCESS,
  setAccessToApplication,
  setStatusApplication,
  STATUS,
} from '../../store/globalStateSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: 'init',
  effect: async (_action, api) => {
    console.log('!');
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(isRejectedWithValue()),
  effect: async (_action, api) => {
    if (_action.payload.code === ACCESS.NoRight) {
      api.dispatch(
        setAccessToApplication({ access: ACCESS.NoRight, message: _action.payload.message }),
      );
    } else {
      api.dispatch(
        setStatusApplication({
          message: _action.payload.message,
          status: STATUS.AsyncError,
          errorCode: _action.payload.code,
        }),
      );
    }
  },
});

export default listenerMiddleware;
