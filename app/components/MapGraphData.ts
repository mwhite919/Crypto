import { convertUnixToDate } from "./UnixTimeConverter";

export const mapGraphData = (item: any[]) => {
  return { time: item[0], yData: item[1] };
};

export const mapGraphData2 = (item: any[]) => {
  return { x: item[0], y: item[1] };
};

export const mapGraphDataTime = (item: any[]) => {
  return convertUnixToDate(item[0]);
};
