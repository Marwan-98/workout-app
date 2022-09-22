/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { getWorkouts, Workout } from "../../redux/slices/workoutSlice";
import Loading from "../loading";

const BrowserWorkout = ({ allWorkouts }: { allWorkouts: Workout[] }) => {
  const images = [
    "./assets/photo1.jpg",
    "./assets/photo2.jpg",
    "./assets/photo3.jpg",
    "./assets/yoga.jpg",
  ];

  const workouts = useAppSelector((state) => state.workout.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkouts(allWorkouts));
  }, []);

  return (
    <div className="py-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {!workouts ? (
        <Loading type="image" />
      ) : (
        workouts.map((workout, idx) => (
          <Link href={`/workout/${workout.id}`} key={Math.random()}>
            <div
              key={idx}
              className="aspect-w-1 aspect-h-1 w-full rounded-lg sm:aspect-w-2 sm:aspect-h-3 cursor-pointer mb-2"
            >
              <img
                src={images[idx]}
                alt=""
                className="h-full w-full rounded object-cover object-center group-hover:opacity-75"
              />
              <p className="font-semibold mt-2">{workout.name}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BrowserWorkout;
