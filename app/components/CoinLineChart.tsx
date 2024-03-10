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

export const CoinLineChart = ({ combinedDataPrices, combinedChartCoins }) => {
  return (
    <div className="bg-second text-xs p-2 m-1">
      <AreaChart
        width={430}
        height={250}
        data={combinedDataPrices}
        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
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
        <Legend verticalAlign="top" align="left" height={36} />
        <Tooltip />
        <Area
          name={combinedChartCoins[0]?.coinName}
          type="monotone"
          dataKey="price1"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#color1)"
        />
        {combinedChartCoins[1]?.coinName && (
          <Area
            name={combinedChartCoins[1]?.coinName}
            type="monotone"
            dataKey="price2"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#color2)"
          />
        )}
        {combinedChartCoins[2]?.coinName && (
          <Area
            name={combinedChartCoins[2]?.coinName}
            type="monotone"
            dataKey="price3"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#color3)"
          />
        )}
      </AreaChart>
    </div>
  );
};
