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

export const ConversionLineChart = ({ conversionGraphData }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <AreaChart
        width={1010}
        height={175}
        data={conversionGraphData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        syncMethod={"value"}
      >
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7105f5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6c31e0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis />
        <YAxis scale="log" domain={["auto", "auto"]} hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="conversion"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#color1)"
        />
      </AreaChart>
    </div>
  );
};
