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
    toggleDNF: (state, action: PayloadAction<string>) => {
      const index = state.times.findIndex((time) => time.id === action.payload);
      if (index === -1) return;
      if (!state.times[index].penalty) {
        state.times[index].dnf = !state.times[index].dnf;
      }
    },
    togglePenalty: (state, action: PayloadAction<string>) => {
      const index = state.times.findIndex((time) => time.id === action.payload);
      if (index === -1) return;
      if (!state.times[index].dnf) {
        state.times[index].penalty = !state.times[index].penalty;
      }
    },
  },
});

export const { addSolve, toggleDNF, togglePenalty } = solves.actions;

export default solves.reducer;
