import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  startingBid: number;
  image: string;
  endTime?: string;
  bids?: number;
}

interface AuctionsState {
  auctions: Auction[];
  selectedAuction: Auction | null;
  loading: boolean;
}

const initialState: AuctionsState = {
  auctions: [],
  selectedAuction: null,
  loading: false,
};

const auctionsSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    setAuctions: (state, action: PayloadAction<Auction[]>) => {
      state.auctions = action.payload;
    },
    setSelectedAuction: (state, action: PayloadAction<Auction | null>) => {
      state.selectedAuction = action.payload;
    },
    addAuction: (state, action: PayloadAction<Auction>) => {
      state.auctions.push(action.payload);
    },
    updateAuction: (state, action: PayloadAction<Auction>) => {
      const index = state.auctions.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.auctions[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuctions, setSelectedAuction, addAuction, updateAuction, setLoading } = auctionsSlice.actions;
export default auctionsSlice.reducer;
