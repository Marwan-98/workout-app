import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import exerciseReducer from "./slices/exerciseSlice";
import recordsSlice from "./slices/recordsSlice";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    exercise: exerciseReducer,
    record: recordsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
