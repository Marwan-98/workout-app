import BrowserWorkout from "../components/browse/BrowserWorkout";

import Layout from "../components/layout";
import { Workout } from "../redux/slices/workoutSlice";

import { prisma } from "./api/db";

const BrowsWorkout = ({ allWorkouts }: { allWorkouts: Workout[] }) => {
  return (
    <>
      <Layout element={"Browse Workouts"}>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl text-center font-semibold text-gray-900">
              Browse our carefully curated workouts
            </h1>
            <p className="text-center text-gray-300">
              Thoughtfully designed workouts meant to push you to the absolute
              limits
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <BrowserWorkout allWorkouts={allWorkouts} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const workouts = await prisma.workout.findMany();
  await prisma.$disconnect;
  const allWorkouts = workouts;
  return {
    props: {
      allWorkouts,
    },
  };
}

export default BrowsWorkout;
