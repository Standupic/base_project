import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import listenerMiddleware from '../middlewares/listeners';
import globalStateSlice from './globalStateSlice';
import userSlice from './userSlice';
import history from './history';

const rootReducer = combineReducers({
  router: connectRouter(history),
  globalState: globalStateSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(routerMiddleware(history), listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
