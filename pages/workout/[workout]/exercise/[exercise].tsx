import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExerciseInfo from "../../../../components/exercise/info/exerciseInfo";
import ExerciseVideo from "../../../../components/exercise/info/exerciseVideo";
import Logger from "../../../../components/exercise/logger/logger";
import Layout from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { useAppSelector } from "../../../../redux/hooks";
import { getExercise } from "../../../../redux/slices/exerciseSlice";

const Exercise = () => {
  const router = useRouter();
  const { exercise, workout } = router.query;
  const dispatch = useDispatch();
  let findExercise = useAppSelector((state) => state.exercise.exercise);

  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:3000/api/exercise/${exercise}`, {
          headers: {
            id: String(exercise),
            workoutId: String(workout),
          },
        })
        .then((res) => {
          dispatch(getExercise(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

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

export default Exercise;
