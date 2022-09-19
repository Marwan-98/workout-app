import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Exercise {
  description: String;
  id: number;
  imageURL: String;
  name: String;
  videoURL: String;
  workoutLines: [
    {
      exerciseId: number;
      id: number;
      recsets: number;
      recweights: number;
      redcreps: number;
      workoutId: number;
    }
  ];
}

const initialState: { exercises: Exercise[]; exercise: Exercise | null } = {
  exercises: [],
  exercise: null,
};

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState,
  reducers: {
    getExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
    },
    getExercise: (state, action: PayloadAction<Exercise>) => {
      state.exercise = action.payload;
    },
  },
});

export const { getExercises, getExercise } = ExerciseSlice.actions;

export const exercises = (state: RootState) => state.exercise;

export default ExerciseSlice.reducer;
