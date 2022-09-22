import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";

const Logger = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  let findExercise = useAppSelector((state) => state.exercise.exercise);
  const { exercise, workout } = router.query;

  const [repsData, setRepsData] = useState<{
    [key: string]: { repInputValue: string };
  }>({});
  const [weightData, setWeightData] = useState<{
    [key: string]: { weightInputValue: string };
  }>({});
  const [userLog, setUserLog] = useState<{ step: number }[]>([]);
  const logWorkout = () => {
    axios.post("/api/log", {
      logs: userLog,
      userId: user!.id,
    });
  };

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
            userId: user!.id,
          },
        ]);
      }
      return setUserLog(updatedLog);
    } else {
      const updatedLog = userLog.filter((log) => log.step !== step);
      return setUserLog(updatedLog);
    }
  };
  useEffect(() => {
    Array.from({ length: findExercise!.workoutLines[0].recsets }).map(
      (rep, idx) => {
        repsData[idx] = { repInputValue: "" };
      }
    );
    Array.from({ length: findExercise!.workoutLines[0].recsets }).map(
      (rep, idx) => {
        weightData[idx] = { weightInputValue: "" };
      }
    );
  }, []);
  return (
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
            length: findExercise!.workoutLines[0].recsets,
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
                    placeholder={`${findExercise?.workoutLines[0].recweights}`}
                    value={String(weightData[idx]?.weightInputValue)}
                    onChange={(e) => {
                      if (
                        /^[0-9]*$/.test((e.target as HTMLInputElement).value)
                      ) {
                        itemChange(e, idx, "w");
                      }
                    }}
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
                    placeholder={`${findExercise?.workoutLines[0].redcreps}`}
                    value={String(repsData[idx]?.repInputValue)}
                    onChange={(e) => {
                      if (
                        /^[0-9]*$/.test((e.target as HTMLInputElement).value)
                      ) {
                        itemChange(e, idx, "r");
                      }
                    }}
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
  );
};

export default Logger;
