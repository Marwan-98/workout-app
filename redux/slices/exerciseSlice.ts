import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface WorkoutLine {
  exerciseId: number;
  id: number;
  recsets: number;
  recweights: number;
  redcreps: number;
  workoutId: number;
}

interface Exercise {
  description: string;
  id: number;
  imageURL: string;
  name: string;
  videoURL: string;
  workoutLines: WorkoutLine[];
}

export interface userExercise {
  createdAt: string;
  exercise: Exercise;
  exerciseId: number;
  id: number;
  reps: number;
  step: number;
  userId: number;
  weight: number;
  workoutLineId: number;
  workoutLine: WorkoutLine;
}

const initialState: {
  exercises: Exercise[];
  exercise: Exercise | null;
  userExercise: { [key: string]: userExercise[] };
} = {
  exercises: [],
  exercise: null,
  userExercise: {},
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
    getUserExercises: (state, action: PayloadAction<{}>) => {
      state.userExercise = action.payload;
    },
  },
});

export const { getExercises, getExercise, getUserExercises } =
  ExerciseSlice.actions;

export const exercises = (state: RootState) => state.exercise;

export default ExerciseSlice.reducer;
