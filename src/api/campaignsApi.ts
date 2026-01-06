import axiosInstance from './axiosInstance';
import { Campaign } from '@/store/slices/campaignsSlice';

export interface CreateCampaignRequest {
  title: string;
  description: string;
  goal: number;
  image: string;
  category?: string;
  location?: string;
  endDate?: string;
}

export interface DonateRequest {
  campaignId: string;
  amount: number;
  paymentMethod: string;
}

export const campaignsApi = {
  getAll: async (): Promise<Campaign[]> => {
    const response = await axiosInstance.get('/campaigns');
    return response.data;
  },

  getById: async (id: string): Promise<Campaign> => {
    const response = await axiosInstance.get(`/campaigns/${id}`);
    return response.data;
  },

  create: async (data: CreateCampaignRequest): Promise<Campaign> => {
    const response = await axiosInstance.post('/campaigns', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateCampaignRequest>): Promise<Campaign> => {
    const response = await axiosInstance.put(`/campaigns/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/campaigns/${id}`);
  },

  donate: async (data: DonateRequest): Promise<{ success: boolean; transactionId: string }> => {
    const response = await axiosInstance.post('/campaigns/donate', data);
    return response.data;
  },
};
