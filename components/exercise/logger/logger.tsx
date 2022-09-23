import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { createRepData } from "../../../redux/slices/repSlice";
import { createWeightData } from "../../../redux/slices/weightSlice";
import TableBody from "./table/tableBody";
import TableHead from "./table/tableHead";

const Logger = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let findExercise = useAppSelector((state) => state.exercise.exercise);
  const { exercise } = router.query;

  const user = useAppSelector((state) => state.user.user);
  const userLog = useAppSelector((state) => state.user.userLog);

  const logWorkout = () => {
    axios.post("/api/log", {
      logs: userLog,
      userId: user!.id,
    });
  };

  useEffect(() => {
    dispatch(createWeightData(findExercise!.workoutLines[0].recsets));
    dispatch(createRepData(findExercise!.workoutLines[0].recsets));
  }, []);

  return (
    <div>
      <h3 className="mb-5">Log Workout</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <TableHead />
        <TableBody exercise={exercise} />
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
