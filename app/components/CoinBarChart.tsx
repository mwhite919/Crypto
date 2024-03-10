import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Rectangle,
  Legend,
  Tooltip,
} from "recharts";

export const CoinBarChart = ({ graphData, combinedChartCoins }) => {
  return (
    <BarChart
      className="bg-second text-xs p-2 m-1"
      width={430}
      height={250}
      data={graphData}
      margin={{
        top: 10,
        right: 30,
        left: 30,
        bottom: 10,
      }}
    >
      <XAxis domain={["auto", "auto"]} dataKey="time" />
      <YAxis scale="log" domain={["auto", "auto"]} hide />
      <Tooltip />
      <Legend verticalAlign="top" align="left" height={36} />
      <Bar
        name={combinedChartCoins[0]?.coinName}
        dataKey="volume1"
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      {combinedChartCoins[1]?.coinName && (
        <Bar
          dataKey="volume2"
          fill="green"
          activeBar={<Rectangle fill="blue" stroke="blue" />}
        />
      )}
      {combinedChartCoins[2]?.coinName && (
        <Bar
          dataKey="volume3"
          fill="blue"
          activeBar={<Rectangle fill="cyan" stroke="blue" />}
        />
      )}
    </BarChart>
  );
};

export default CoinBarChart;
