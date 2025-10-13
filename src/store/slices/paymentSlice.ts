import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaymentInfo {
  amount: number;
  method: 'card' | 'bank' | 'wallet' | 'qr';
  itemId: string;
  itemType: 'campaign' | 'auction' | 'challenge';
  cardNumber?: string;
  bankCode?: string;
  walletType?: string;
}

interface PaymentState {
  currentPayment: PaymentInfo | null;
  paymentHistory: PaymentInfo[];
  processing: boolean;
}

const initialState: PaymentState = {
  currentPayment: null,
  paymentHistory: [],
  processing: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.currentPayment = action.payload;
    },
    startProcessing: (state) => {
      state.processing = true;
    },
    completePayment: (state) => {
      if (state.currentPayment) {
        state.paymentHistory.push(state.currentPayment);
      }
      state.currentPayment = null;
      state.processing = false;
    },
    cancelPayment: (state) => {
      state.currentPayment = null;
      state.processing = false;
    },
  },
});

export const { setPaymentInfo, startProcessing, completePayment, cancelPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
