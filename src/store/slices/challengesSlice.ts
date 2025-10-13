import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: string;
  category?: string;
  endDate?: string;
  tasks?: string[];
}

interface ChallengesState {
  challenges: Challenge[];
  selectedChallenge: Challenge | null;
  loading: boolean;
}

const initialState: ChallengesState = {
  challenges: [],
  selectedChallenge: null,
  loading: false,
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setChallenges: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
    },
    setSelectedChallenge: (state, action: PayloadAction<Challenge | null>) => {
      state.selectedChallenge = action.payload;
    },
    addChallenge: (state, action: PayloadAction<Challenge>) => {
      state.challenges.push(action.payload);
    },
    updateChallenge: (state, action: PayloadAction<Challenge>) => {
      const index = state.challenges.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.challenges[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setChallenges, setSelectedChallenge, addChallenge, updateChallenge, setLoading } = challengesSlice.actions;
export default challengesSlice.reducer;
