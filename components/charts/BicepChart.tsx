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
      },
    ],
  };
  return <Line data={userData} style={{ backgroundColor: "black" }} />;
}

export default BicepChart;
