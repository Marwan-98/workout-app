import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  streak: number;
};

interface UserLog {
  step: number;
  reps: number;
  weight: number;
  workoutLineId: number;
  exerciseId: number;
  userId: string;
}

const initialState: { user: null | User; userLog: UserLog[] } = {
  user: null,
  userLog: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserLog: (state, action: PayloadAction<UserLog>) => {
      let log = state.userLog.find((i) => i.step == action.payload.step);
      if (log) {
        log = { ...action.payload };
      } else {
        state.userLog = [...state.userLog, action.payload];
      }
    },
    deleteUserLog: (state, action: PayloadAction<number>) => {
      state.userLog = state.userLog.filter(
        (log) => log.step !== action.payload
      );
    },
  },
});

export const { getUser, setUserLog, deleteUserLog } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
