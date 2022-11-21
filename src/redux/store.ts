import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});