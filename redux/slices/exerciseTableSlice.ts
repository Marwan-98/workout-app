import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { tableData: Record<string, string>[] } = {
  tableData: [],
};

const exerciseTableSlice = createSlice({
  name: "weightInput",
  initialState,
  reducers: {
    setWeightData: (state, action: PayloadAction<[string, number]>) => {
      const input = state.tableData.find((i, idx) => idx == action.payload[1]);
      if (input) input.weightInputValue = action.payload[0];
    },
    setRepData: (state, action: PayloadAction<[string, number]>) => {
      const input = state.tableData.find((i, idx) => idx == action.payload[1]);
      if (input) input.repInputValue = action.payload[0];
    },
    createTableData: (state, action: PayloadAction<number>) => {
      let arr: Record<string, string>[] = [];
      Array.from({ length: action.payload }).map((rep, idx) => {
        arr[idx] = {};
      });
      state.tableData = arr;
    },
  },
});

export const { setWeightData, setRepData, createTableData } =
  exerciseTableSlice.actions;

export const weightData = (state: RootState) => state.tableData;

export default exerciseTableSlice.reducer;
