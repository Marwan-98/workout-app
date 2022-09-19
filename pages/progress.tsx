import Layout from "../components/layout";
import SquatChart from "../components/charts/SquatChart";
import BicepChart from "../components/charts/BicepChart";
import Chart3 from "../components/charts/Chart3";
import Chart4 from "../components/charts/Chart4";

const Progress = () => {
  const averages = [
    { name: "Bench Press", id: 1, backgroundColor: "red" },
    { name: "Pull Ups", id: 2, backgroundColor: "black" },
  ];
  return (
    <>
      <Layout element={"progress"}>
        <h1>My Progress</h1>
        <div className=" mx-2 my-5 grid grid-cols-2 gap-5">
          {averages.map((average) => (
            <div className="">
              <SquatChart
                name={average.name}
                id={average.id}
                backgroundColor={average.backgroundColor}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Progress;
