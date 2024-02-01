
import { useCrypto } from "@/app/Providers/CryptoProvider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const CoinLineChart = ({ graphData, interval }) => {

  const { currency, currencySymbol } = useCrypto();

console.log("here", currency)

  return (
<div><AreaChart width={430} height={250} data={graphData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#7105f5" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#6c31e0" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="time" interval={interval}  />
  <YAxis scale="log" domain={["auto", "auto"]} interval={interval} hide/>
  <Tooltip />
  <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorP)" />
</AreaChart>
  </div>
  );
};
