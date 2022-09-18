// import { Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";

function SquatChart() {
  ChartJS?.register(CategoryScale);
  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    backgroundColor: "red",
    datasets: [
      {
        label: "Squat",
        data: [130, 135, 245, 130, 220, 100, 110],
        backgroundColor: ["black"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  return <Line data={userData} style={{ backgroundColor: "red" }} />;
}

export default SquatChart;
