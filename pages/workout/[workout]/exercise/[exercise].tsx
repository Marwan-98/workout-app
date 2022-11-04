import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../../api/db";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExerciseInfo from "../../../../components/exercise/info/exerciseInfo";
import ExerciseVideo from "../../../../components/exercise/info/exerciseVideo";
import Logger from "../../../../components/exercise/logger/logger";
import Layout from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { useAppSelector } from "../../../../redux/hooks";
import { Exercise, getExercise } from "../../../../redux/slices/exerciseSlice";

const Exercise = ({ exercise }: { exercise: Exercise }) => {
  const dispatch = useDispatch();
  let findExercise = useAppSelector((state) => state.exercise.exercise);

  useEffect(() => {
    dispatch(getExercise(exercise));
  }, []);

  return (
    <Layout element="Browse Workouts">
      {findExercise ? (
        <>
          <div className="flex justify-around mb-20">
            <ExerciseVideo videoURL={findExercise?.videoURL} />
            <ExerciseInfo
              name={findExercise?.name}
              recsets={findExercise?.workoutLines[0].recsets}
              recreps={findExercise?.workoutLines[0].redcreps}
              description={findExercise?.description}
            />
          </div>
          <Logger />
        </>
      ) : (
        <Loading type="exercise" />
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const exercises = await prisma.workoutLine.groupBy({
    by: ["workoutId", "exerciseId"],
  });

  prisma.$disconnect;

  const paths = exercises.map(
    (exercise: { workoutId: number; exerciseId: number }) => {
      return {
        params: {
          workout: String(exercise.workoutId),
          exercise: String(exercise.exerciseId),
        },
      };
    }
  );
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: {
    workout: string;
    exercise: string;
  };
}) {
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: +params.exercise,
    },
    include: {
      workoutLines: {
        where: {
          workoutId: +params.workout,
        },
      },
    },
  });

  prisma.$disconnect;

  return {
    props: {
      exercise,
    },
  };
}

export default Exercise;
