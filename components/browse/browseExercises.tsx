/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { Exercise, getExercises } from "../../redux/slices/exerciseSlice";
import Loading from "../loading";

const BrowseExercises = ({ exercises }: { exercises: Exercise[] }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { workout } = router.query;
  const allExercises = useAppSelector((state) => state.exercise.exercises);
  useEffect(() => {
    dispatch(getExercises(exercises));
  }, []);
  const images = [
    "../assets/photo1.jpg",
    "../assets/photo2.jpg",
    "../assets/photo3.jpg",
    "../assets/yoga.jpg",
  ];
  return (
    <div className="py-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
      {!allExercises ? (
        <Loading type="image" />
      ) : (
        allExercises.map((exercise, idx) => (
          <Link href={`${workout}/exercise/${exercise.id}`} key={Math.random()}>
            <div
              key={idx}
              className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3 cursor-pointer"
            >
              <img
                src={images[idx]}
                alt=""
                className="h-96 w-full object-cover object-center group-hover:opacity-75"
              />
              <p className="font-semibold mt-2">{exercise.name}</p>
              {/* <p className="font-light mt-2 italic">4 Sets x 20 Reps</p> */}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BrowseExercises;
