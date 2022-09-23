import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface repInput {
  [key: string]: { repInputValue: string };
}

const initialState: { repData: repInput[] } = {
  repData: [],
};
const repSlice = createSlice({
  name: "repInput",
  initialState,
  reducers: {
    setRepData: (state, action: PayloadAction<[string, number]>) => {
      const input = state.repData.find((i, idx) => idx == action.payload[1]);
      if (input) input.repInputValue = action.payload[0];
    },
    createRepData: (state, action: PayloadAction<number>) => {
      let arr: repInput[] = [];
      Array.from({ length: action.payload }).map((rep, idx) => {
        arr[idx] = { repInputValue: "" };
      });
      state.repData = arr;
    },
  },
});

export const { setRepData, createRepData } = repSlice.actions;

export const repData = (state: RootState) => state.repData;

export default repSlice.reducer;
