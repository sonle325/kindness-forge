import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  image: string;
  category?: string;
  location?: string;
  endDate?: string;
}

interface CampaignsState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  loading: boolean;
}

const initialState: CampaignsState = {
  campaigns: [],
  selectedCampaign: null,
  loading: false,
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns = action.payload;
    },
    setSelectedCampaign: (state, action: PayloadAction<Campaign | null>) => {
      state.selectedCampaign = action.payload;
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns.push(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<Campaign>) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCampaigns, setSelectedCampaign, addCampaign, updateCampaign, setLoading } = campaignsSlice.actions;
export default campaignsSlice.reducer;
