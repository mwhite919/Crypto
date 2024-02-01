import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Rectangle,
    Legend,
    Tooltip
  } from "recharts";


export const CoinBarChart = ({graphData}) =>{
 return(
    
    <BarChart
      width={430}
      height={250}
      data={graphData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis  scale="log" domain={["auto", "auto"]}  dataKey="time" />
      <YAxis  scale="log" domain={["auto", "auto"]} hide/>
      <Tooltip />
 
      <Bar dataKey="price" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
    </BarChart>

 )
}

export default CoinBarChart