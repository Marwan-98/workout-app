import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  streak: number;
};

const initialState: { user: null | User } = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
