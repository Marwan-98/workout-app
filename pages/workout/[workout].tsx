import axios from "axios";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import BrowseExercises from "../../components/browse/browseExercises";

import Layout from "../../components/layout";
import { Exercise } from "../../redux/slices/exerciseSlice";
import { Workout } from "../../redux/slices/workoutSlice";

const BrowsWorkout = ({ allExercises }: { allExercises: Exercise[] }) => {
  return (
    <>
      <Layout element={"Browse Workouts"}>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl text-center font-semibold text-gray-900">
              Browse our carefully curated exercises
            </h1>
            <p className="text-center text-gray-300">
              Thoughtfully designed exercises meant to push you to the absolute
              limits
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <BrowseExercises allExercises={allExercises} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const res = await axios.get("http://localhost:3000/api/workouts");

  const allWorkouts = await res.data;

  const paths = allWorkouts.map((workout: Workout) => ({
    params: { workout: String(workout.id) },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/workout/${params?.workout}`,
    {
      headers: {
        id: +params!.workout!,
      },
    }
  );
  const allExercises = res.data;
  return {
    props: {
      allExercises,
    },
  };
};

export default BrowsWorkout;
