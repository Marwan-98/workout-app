import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Workout {
  id: number;
  name: string;
}

const initialState: {
  workouts: Workout[] | null;
} = {
  workouts: null,
};

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    getWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
    },
  },
});

export const { getWorkouts } = workoutSlice.actions;

export const workouts = (state: RootState) => state.workout;

export default workoutSlice.reducer;
