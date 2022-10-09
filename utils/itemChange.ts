import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setRepData, setWeightData } from "../redux/slices/exerciseTableSlice";

export const itemChange = (
  e: React.FormEvent<HTMLInputElement>,
  index: number,
  type: string,
  dispatch: Dispatch<AnyAction>
) => {
  if (type == "w") {
    dispatch(setWeightData([(e.target as HTMLInputElement).value, index]));
  } else {
    dispatch(setRepData([(e.target as HTMLInputElement).value, index]));
  }
};
