import Layout from "../components/layout";
import SquatChart from "../components/charts/SquatChart";
import BicepChart from "../components/charts/BicepChart";
import Chart3 from "../components/charts/Chart3";
import Chart4 from "../components/charts/Chart4";

const Progress = () => {
  return (
    <>
      <Layout element={"progress"}>
        <h1>My Progress</h1>
        <div className=" mx-2 my-5 grid grid-cols-2 gap-5">
          <div className="">
            <SquatChart />
          </div>
          <div className="">
            <BicepChart />
          </div>
          <div className="">
            <Chart3 />
          </div>
          <div className="">
            <Chart4 />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Progress;
