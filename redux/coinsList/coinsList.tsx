import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CoinsListState {
coinsList: any[];
isLoading: boolean;
pageNumber: number;
hasError: boolean;
hasMore: boolean;
}

const initialState: CoinsListState ={
    listOfCoins: any[];
    isLoading: false;
    pageNumber: 1;
    hasError: false;
    hasMore: false;
}

interface CoinsList {
    currency: string;
    pageNumber: number;
}


const coinsListSlice = createSlice({
    name: 'coinsList',
    initialState,
    reducers: {
      incrementPage: (state) => {
        state.pageNumber += 1;
      }
    }
  });


export const { incrementPage } = coinsListSlice.actions;
export default coinsListSlice.reducer;