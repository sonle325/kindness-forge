import axiosInstance from './axiosInstance';

export interface ProcessPaymentRequest {
  amount: number;
  method: 'card' | 'bank' | 'wallet' | 'qr';
  itemId: string;
  itemType: 'campaign' | 'auction' | 'challenge';
  cardNumber?: string;
  bankCode?: string;
  walletType?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export const paymentApi = {
  processPayment: async (data: ProcessPaymentRequest): Promise<PaymentResponse> => {
    const response = await axiosInstance.post('/payments/process', data);
    return response.data;
  },

  getPaymentHistory: async (): Promise<PaymentResponse[]> => {
    const response = await axiosInstance.get('/payments/history');
    return response.data;
  },

  getPaymentById: async (transactionId: string): Promise<PaymentResponse> => {
    const response = await axiosInstance.get(`/payments/${transactionId}`);
    return response.data;
  },

  verifyPayment: async (transactionId: string): Promise<{ verified: boolean }> => {
    const response = await axiosInstance.get(`/payments/${transactionId}/verify`);
    return response.data;
  },
};
