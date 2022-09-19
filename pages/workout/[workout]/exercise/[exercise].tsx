import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../../../components/layout";
import { useAppSelector } from "../../../../redux/hooks";
import { getExercise } from "../../../../redux/slices/exerciseSlice";

const Exercise = () => {
  const router = useRouter();
  const { exercise, workout } = router.query;
  const dispatch = useDispatch();
  let findExercise = useAppSelector((state) => state.exercise.exercise);
  const [repsData, setRepsData] = useState<{
    [key: string]: { repInputValue: string };
  }>({});
  const [weightData, setWeightData] = useState<{
    [key: string]: { weightInputValue: string };
  }>({});

  const [userLog, setUserLog] = useState<{ step: number }[]>([]);

  const itemChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => {
    if (type == "w") {
      setWeightData((weightData) => ({
        ...weightData,
        [index]: { weightInputValue: (e.target as HTMLInputElement).value },
      }));
    } else {
      setRepsData((repsData) => ({
        ...repsData,
        [index]: { repInputValue: (e.target as HTMLInputElement).value },
      }));
    }
  };

  const logSet = (
    e: React.FormEvent<HTMLInputElement>,
    step: number,
    idx: number
  ) => {
    if ((e.target as HTMLInputElement).checked) {
      let foundLog = false;
      const updatedLog = userLog.map((log) => {
        if (log.step === step) {
          foundLog = true;
          return {
            ...log,
            reps: repsData[idx].repInputValue,
            weight: weightData[idx].weightInputValue,
          };
        } else {
          return log;
        }
      });
      if (!foundLog) {
        return setUserLog((prevState) => [
          ...prevState,
          {
            step,
            reps: +repsData[idx].repInputValue,
            weight: +weightData[idx].weightInputValue,
            workoutLineId: findExercise?.workoutLines[0].id,
            exerciseId: +exercise!,
          },
        ]);
      }
      return setUserLog(updatedLog);
    } else {
      const updatedLog = userLog.filter((log) => log.step !== step);
      return setUserLog(updatedLog);
    }
  };

  const logWorkout = () => {
    axios
      .post("/api/log", {
        logs: userLog,
      })
      .then((res) => console.log(res));
  };

  useEffect(() => {
    Array.from({ length: 4 }).map((rep, idx) => {
      repsData[idx] = { repInputValue: "" };
    });
    Array.from({ length: 4 }).map((rep, idx) => {
      weightData[idx] = { weightInputValue: "" };
    });
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
    return () => {};
  }, [router.isReady]);

  useEffect(() => {
    console.log(userLog);
  }, [userLog]);

  return (
    <Layout element="Browse Workouts">
      {findExercise ? (
        <>
          <div className="flex justify-around mb-20">
            <div className="flex-initial w-3/5 px-10">
              <div className="w-full aspect-video">
                <iframe
                  src={findExercise?.videoURL}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
            <div className="flex-initial w-2/5">
              <h3 className="text-4xl mb-4">{findExercise?.name}</h3>
              <p className="mb-4">{`${findExercise?.workoutLines[0].recsets} Sets x ${findExercise?.workoutLines[0].redcreps} Reps`}</p>
              <p>{findExercise?.description}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-5">Log Workout</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                  >
                    Weight (KG)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-center font-bold text-left text-gray-500 uppercase "
                  >
                    Reps
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-center font-bold text-right text-gray-500 uppercase "
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.from({
                  length: findExercise.workoutLines[0].recsets,
                }).map((set, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                      <div>
                        <label className="sr-only">Weight</label>
                        <input
                          type="text"
                          name="weight"
                          id="weight"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={`${
                            findExercise!.workoutLines[0].recweights
                          }`}
                          value={String(weightData[idx]?.weightInputValue)}
                          onChange={(e) => itemChange(e, idx, "w")}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                      <div>
                        <label className="sr-only">Reps</label>
                        <input
                          type="text"
                          name="reps"
                          id="reps"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={`${
                            findExercise!.workoutLines[0].redcreps
                          }`}
                          value={String(repsData[idx]?.repInputValue)}
                          onChange={(e) => itemChange(e, idx, "r")}
                        />
                      </div>
                    </td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                          onChange={(e) => logSet(e, idx, idx)}
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-black text-white m-10 p-2 rounded"
              onClick={() => logWorkout()}
            >
              Log Workout
            </button>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </Layout>
  );
};

export default Exercise;
