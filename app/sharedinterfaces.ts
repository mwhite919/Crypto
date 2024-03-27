export interface Coin {
  current_price: any;
  price_change_24h: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  value: string;
  id: string;
  coin: CoinType;
  amount: number;
  purchasePrice: any;
  date: string;
  image: string;
  name: string;
}

export interface ChartCoin {
  id: string;
  coinName: string;
  time: string | number;
  prices: number[];
  volume: number[];
}

export interface CoinType {
  id: string;
  image: string | undefined;
  name: string;
  symbol: string;
  price: number;
  total_volume: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  index: number;
  sparkline_in_7d: {
    price: number[];
  };
}
