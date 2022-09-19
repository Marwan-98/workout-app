import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Workout {
  id: number;
  name: string;
}

const initialState: Workout[] = [];

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    getWorkouts: (state, action: PayloadAction<Workout[]>) => {
      return action.payload;
    },
  },
});

export const { getWorkouts } = workoutSlice.actions;

export const workouts = (state: RootState) => state.workout;

export default workoutSlice.reducer;
