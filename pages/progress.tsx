import Layout from "../components/layout";
import Chart from "../components/charts/chart";
import { prisma } from "./api/db";
import { Exercise } from "@prisma/client";

const Progress = ({ exercises }: { exercises: Exercise[] }) => {
  const averages = exercises.map((exercise) => {
    return { ...exercise, backgroundColor: "red" };
  });
  return (
    <>
      <Layout element={"progress"}>
        <h1>My Progress</h1>
        <div className=" mx-2 my-5 grid grid-cols-2 gap-5">
          {averages.map((average) => (
            <div className="" key={average.id}>
              <Chart
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

export async function getStaticProps({}) {
  const exercises = await prisma.exercise.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: {
      exercises,
    },
  };
}

export default Progress;
