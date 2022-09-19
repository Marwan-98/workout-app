import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Record {
  name: string;
  weight: number;
}

const initialState: Record[] = [];

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    getRecords: (state, action: PayloadAction<Record[]>) => {
      return action.payload;
    },
  },
});

export const { getRecords } = recordSlice.actions;
export const exercises = (state: RootState) => state.record;
export default recordSlice.reducer;
