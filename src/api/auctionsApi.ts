import axiosInstance from './axiosInstance';
import { Auction } from '@/store/slices/auctionsSlice';

export interface CreateAuctionRequest {
  title: string;
  description: string;
  startingBid: number;
  image: string;
  endTime?: string;
}

export interface PlaceBidRequest {
  auctionId: string;
  amount: number;
}

export const auctionsApi = {
  getAll: async (): Promise<Auction[]> => {
    const response = await axiosInstance.get('/auctions');
    return response.data;
  },

  getById: async (id: string): Promise<Auction> => {
    const response = await axiosInstance.get(`/auctions/${id}`);
    return response.data;
  },

  create: async (data: CreateAuctionRequest): Promise<Auction> => {
    const response = await axiosInstance.post('/auctions', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateAuctionRequest>): Promise<Auction> => {
    const response = await axiosInstance.put(`/auctions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/auctions/${id}`);
  },

  placeBid: async (data: PlaceBidRequest): Promise<{ success: boolean; currentBid: number }> => {
    const response = await axiosInstance.post('/auctions/bid', data);
    return response.data;
  },
};
