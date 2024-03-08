import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

export const CoinLineChart = ({ combinedDataPrices }) => {
  return (
    <div>
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
        <Label
          value="Pages of my website"
          offset={0}
          position="insideTopLeft"
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price1"
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
