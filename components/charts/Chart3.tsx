import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";

function Chart3() {
  ChartJS?.register(CategoryScale);

  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    // backgroundColor: "red",
    datasets: [
      {
        label: "Chart-3",
        data: [120, 158, 220, 245, 180, 140, 100],
        backgroundColor: ["white"],
        borderColor: "white",
        borderWidth: 2,
      }
    ],
  };
  return <Line data={userData} style={{ backgroundColor: "blue" }} />;
}

export default Chart3;
