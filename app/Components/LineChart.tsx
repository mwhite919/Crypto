import React from "react";
import { CategoryScale, Chart, LinearScale
   } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale
);


const LineChart = ({ chartCoin }) => {




  const prices = chartCoin?.prices;
  const priceData = prices?.map((x) => x[1]);
  const yAxis = prices?.map((x) => x[0]);

  const data = {
    labels: priceData,
    datasets: [{ label: "side", x: yAxis, y: priceData}],
  };


  return (
    <div className="flex">
      <div className="m-10 h-64 w-96 bg-purple-600">
        <canvas id="myChart" width="800" height="400">
          
        </canvas>
      </div>
      <div className="m-10 h-64 w-96 bg-purple-600"></div>
    </div>
  );
};

export default LineChart;
