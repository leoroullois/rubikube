import { Moves } from "@lib/cubes/Moves";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITime } from "src/typescript/types";

interface IState {
  times: ITime[];
}

const init = (): IState => {
  return {
    times: [
      {
        id: 1000,
        time: 1000,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: true,
      },
      {
        id: 1000,
        time: 2000,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 6540,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: true,
        dnf: false,
      },
      {
        id: 1000,
        time: 10000,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 5000,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 3000,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 8454,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1254,
        time: 1450,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 5648,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: true,
        dnf: false,
      },
      {
        id: 1000,
        time: 2547,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 2547,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 2547,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 2547,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
      {
        id: 1000,
        time: 2547,
        date: new Date().toISOString(),
        scramble: "R U R' U'",
        penalty: false,
        dnf: false,
      },
    ],
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
