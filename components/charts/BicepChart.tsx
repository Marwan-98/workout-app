import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";

function BicepChart() {
  ChartJS?.register(CategoryScale);

  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

    datasets: [
      {
        label: "Bicep Curl",
        data: [130, 158, 110, 245, 220, 190, 250],
        backgroundColor: ["white"],
        borderColor: "white",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "white",
          font:{
            size:12
          }
        },
      },
      y: {
        ticks: {
          color: "white",
          font:{
            size:12
          }
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <Line
      data={userData}
      options={options}
      style={{ backgroundColor: "black" }}
    />
  );
}

export default BicepChart;
