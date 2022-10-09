import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setUserLog, deleteUserLog } from "../redux/slices/userSlice";

export const logSet = (
  e: React.FormEvent<HTMLInputElement>,
  step: number,
  exerciseId: number,
  reps: number,
  weight: number,
  workoutLineId: number,
  userId: string,
  dispatch: Dispatch<AnyAction>
) => {
  if ((e.target as HTMLInputElement).checked) {
    dispatch(
      setUserLog({
        step,
        reps,
        weight,
        workoutLineId,
        exerciseId,
        userId,
      })
    );
  } else {
    dispatch(deleteUserLog(step));
  }
};
