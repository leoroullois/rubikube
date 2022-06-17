import { Moves } from "@lib/cubes/Moves";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITime } from "src/typescript/types";

interface IState {
  times: ITime[];
}

const init = (): IState => {
  return {
    times: [],
  };
};

const solves = createSlice({
  name: "solves",
  initialState: init(),
  reducers: {
    addSolve: (state, action: PayloadAction<ITime>) => {
      state.times.push(action.payload);
    },
  },
});

export const { addSolve } = solves.actions;

export default solves.reducer;
