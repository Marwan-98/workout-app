// import { Line } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {
  add,
  format,
  getMonth,
  getYear,
  startOfMonth,
  startOfToday,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";

function SquatChart({
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
      for (let i = 0; i < prevMonths.length; i++) {
        axios
          .get("/api/record", {
            headers: {
              id,
              userId: user!.id,
              year: getYear(today),
              month: format(new Date(`${prevMonths[i]} 1`), "MM"),
            },
          })
          .then((res) => {
            res.data.length == 0
              ? setWeightData((weightData) => [...weightData, 0])
              : setWeightData((weightData) => [
                  ...weightData,
                  res.data[0]._avg.weight,
                ]);
          });
      }
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
    <h1>Loading</h1>
  ) : (
    <Line data={userData} options={options} style={{ backgroundColor }} />
  );
}

export default SquatChart;
