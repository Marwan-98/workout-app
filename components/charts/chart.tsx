// import { Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { format, startOfMonth, startOfToday, sub } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../loading";

function Chart({
  name,
  id,
  backgroundColor,
}: {
  name: string;
  id: number;
  backgroundColor: string;
}) {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const today = startOfToday();
  const [weightData, setWeightData] = useState<number[]>([]);
  const prevMonths: string[] = [];
  for (let i = 0; i < 7; i++) {
    prevMonths.unshift(format(sub(startOfMonth(today), { months: i }), "MMM"));
  }
  useEffect(() => {
    if (router.isReady) {
      axios
        .get("/api/record", {
          headers: {
            id,
            userId: user!.id,
            prevMonths: prevMonths.join(","),
          },
        })
        .then((res) => {
          let dataArr: number[] = [];
          for (let i = 0; i < res.data.length; i++) {
            res.data[i][0]
              ? (dataArr[i] = res.data[i][0]._avg.weight)
              : (dataArr[i] = 0);
          }
          setWeightData((weightData) => [...weightData, ...dataArr]);
        });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (weightData.length === prevMonths.length) {
      setLoading(false);
    }
  }, [weightData]);

  ChartJS?.register(CategoryScale);
  const userData = {
    labels: prevMonths,
    backgroundColor: "blue",
    datasets: [
      {
        label: name,
        data: loading ? [] : weightData,
        backgroundColor: ["black"],
        borderColor: "white",
        lineTension: 0.4,
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
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
  return loading ? (
    <Loading type="chart" />
  ) : (
    <Line data={userData} options={options} style={{ backgroundColor }} />
  );
}

export default Chart;
