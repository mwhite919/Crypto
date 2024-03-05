import { useCrypto } from "@/app/Providers/CryptoProvider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { scaleLog } from "d3-scale";

const scale = scaleLog().base(Math.E);

export const CoinLineChart = ({ combinedDataPrices }) => {
  const { currency, currencySymbol } = useCrypto();

  return (
    <div className="h-96">
      <AreaChart
        width={430}
        height={250}
        data={combinedDataPrices}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        syncMethod={"value"}
      >
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7105f5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6c31e0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7517F8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6c31e0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6c31e0" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6c31e0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" />
        <YAxis scale="log" domain={["auto", "auto"]} hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#color1)"
        />
        <Area
          type="monotone"
          dataKey="price2"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#color2)"
        />
        <Area
          type="monotone"
          dataKey="price3"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#color3)"
        />
      </AreaChart>
    </div>
  );
};
