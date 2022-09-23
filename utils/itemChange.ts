import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setRepData } from "../redux/slices/repSlice";
import { setWeightData } from "../redux/slices/weightSlice";

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
