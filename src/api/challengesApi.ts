import axiosInstance from './axiosInstance';
import { Challenge } from '@/store/slices/challengesSlice';

export interface CreateChallengeRequest {
  title: string;
  description: string;
  reward: number;
  difficulty: string;
  category?: string;
  endDate?: string;
  tasks?: string[];
}

export interface JoinChallengeRequest {
  challengeId: string;
}

export const challengesApi = {
  getAll: async (): Promise<Challenge[]> => {
    const response = await axiosInstance.get('/challenges');
    return response.data;
  },

  getById: async (id: string): Promise<Challenge> => {
    const response = await axiosInstance.get(`/challenges/${id}`);
    return response.data;
  },

  create: async (data: CreateChallengeRequest): Promise<Challenge> => {
    const response = await axiosInstance.post('/challenges', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateChallengeRequest>): Promise<Challenge> => {
    const response = await axiosInstance.put(`/challenges/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/challenges/${id}`);
  },

  join: async (data: JoinChallengeRequest): Promise<{ success: boolean }> => {
    const response = await axiosInstance.post('/challenges/join', data);
    return response.data;
  },

  complete: async (challengeId: string): Promise<{ success: boolean; reward: number }> => {
    const response = await axiosInstance.post(`/challenges/${challengeId}/complete`);
    return response.data;
  },
};
