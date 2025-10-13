import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import campaignsReducer from './slices/campaignsSlice';
import auctionsReducer from './slices/auctionsSlice';
import challengesReducer from './slices/challengesSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignsReducer,
    auctions: auctionsReducer,
    challenges: challengesReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
