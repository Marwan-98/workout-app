import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";
import exerciseReducer from "./slices/exerciseSlice";
import recordsSlice from "./slices/recordsSlice";
import userSlice from "./slices/userSlice";
import weightSlice from "./slices/weightSlice";
import repSlice from "./slices/repSlice";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    exercise: exerciseReducer,
    record: recordsSlice,
    user: userSlice,
    weightData: weightSlice,
    repData: repSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
