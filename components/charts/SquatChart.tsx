// import { Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {
  add,
  format,
  getMonth,
  startOfMonth,
  startOfToday,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";

function SquatChart() {
  const today = startOfToday();
  const month = format(startOfMonth(today), "MMM");
  const [weightData, setWeightData] = useState<number[]>([]);
  const prevMonths = [];
  for (let i = 0; i < 7; i++) {
    prevMonths.unshift(format(sub(startOfMonth(today), { months: i }), "MMM"));
  }
  useEffect(() => {
    axios
      .get("/api/record", {
        headers: {
          id: 1,
        },
      })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          setWeightData((weightData) => [...weightData, res.data[i].weight]);
        }
      });
  }, []);
  ChartJS?.register(CategoryScale);
  const userData = {
    labels: prevMonths,
    backgroundColor: "red",
    datasets: [
      {
        label: "Squat",
        data: weightData,
        backgroundColor: ["black"],
        borderColor: "white",
        lineTension: 0.4,
        borderWidth: 2,
      },
    ],
  };
  return <Line data={userData} style={{ backgroundColor: "red" }} />;
}

export default SquatChart;
