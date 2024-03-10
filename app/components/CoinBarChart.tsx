import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Rectangle,
  Legend,
  Tooltip,
} from "recharts";

export const CoinBarChart = ({ graphData }) => {
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

      <Bar
        dataKey="volume1"
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />

      <Bar
        dataKey="volume2"
        fill="green"
        activeBar={<Rectangle fill="blue" stroke="blue" />}
      />

      <Bar
        dataKey="volume3"
        fill="blue"
        activeBar={<Rectangle fill="cyan" stroke="blue" />}
      />
    </BarChart>
  );
};

export default CoinBarChart;
