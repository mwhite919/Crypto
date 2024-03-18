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
import { useCrypto } from "../Providers/CryptoProvider";
import { lineGraphStyling } from "../utils/lineGraphStyling";

export const CoinLineChart = ({ combinedDataPrices, combinedChartCoins }) => {
  const { palette, mode } = useCrypto();

  const colorsGroup = lineGraphStyling[palette];

  function xAxisColor(mode) {
    if (mode === "dark") {
      {
        return "white";
      }
    } else {
      if (palette === "Basic") {
        return "#3730a3";
      }
      if (palette === "Teal") {
        return "#0f766e";
      }
      if (palette === "Rose") {
        return "#9f1239";
      }
    }
  }

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
            <stop
              offset="5%"
              stopColor={colorsGroup?.coin1.stopColor1}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={colorsGroup?.coin1.stopColor2}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={colorsGroup?.coin2.stopColor1}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={colorsGroup?.coin2.stopColor2}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={colorsGroup?.coin3.stopColor1}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={colorsGroup?.coin3.stopColor2}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke={xAxisColor(mode)} />
        <YAxis scale="log" domain={["auto", "auto"]} hide />
        <Legend verticalAlign="top" align="left" height={36} />
        <Tooltip />
        <Area
          name={combinedChartCoins[0]?.coinName}
          type="monotone"
          dataKey="price1"
          stroke={colorsGroup?.coin1.strokeColor}
          fillOpacity={1}
          fill="url(#color1)"
        />
        {combinedChartCoins[1]?.coinName && (
          <Area
            name={combinedChartCoins[1]?.coinName}
            type="monotone"
            dataKey="price2"
            stroke={colorsGroup?.coin2.strokeColor}
            fillOpacity={1}
            fill="url(#color2)"
          />
        )}
        {combinedChartCoins[2]?.coinName && (
          <Area
            name={combinedChartCoins[2]?.coinName}
            type="monotone"
            dataKey="price3"
            stroke={colorsGroup?.coin3.strokeColor}
            fillOpacity={1}
            fill="url(#color3)"
          />
        )}
      </AreaChart>
    </div>
  );
};
