import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import blogSlice from './slice/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
