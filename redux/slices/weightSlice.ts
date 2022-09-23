import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface weightInput {
  [key: string]: { weightInputValue: string };
}

const initialState: { weightData: weightInput[] } = {
  weightData: [],
};
const weightSlice = createSlice({
  name: "weightInput",
  initialState,
  reducers: {
    setWeightData: (state, action: PayloadAction<[string, number]>) => {
      const input = state.weightData.find((i, idx) => idx == action.payload[1]);
      if (input) input.weightInputValue = action.payload[0];
    },
    createWeightData: (state, action: PayloadAction<number>) => {
      let arr: weightInput[] = [];
      Array.from({ length: action.payload }).map((rep, idx) => {
        arr[idx] = { weightInputValue: "" };
      });
      state.weightData = arr;
    },
  },
});

export const { setWeightData, createWeightData } = weightSlice.actions;

export const weightData = (state: RootState) => state.weightData;

export default weightSlice.reducer;
