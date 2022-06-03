import { CubeArray } from "./../../lib/cubes/types";
import { Moves } from "@lib/cubes/Moves";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "@lib/cubes/types";
interface IState {
   scramble: string;
   cubeArray: CubeArray;
}

const init = (): IState => {
   const { White, Orange, Yellow, Blue, Green, Red } = Color;
   return {
      scramble: "",
      cubeArray: [
         Array(9).fill(White),
         Array(9).fill(Orange),
         Array(9).fill(Green),
         Array(9).fill(Red),
         Array(9).fill(Blue),
         Array(9).fill(Yellow),
      ],
   };
};

const timer = createSlice({
   name: "timer",
   initialState: init(),
   reducers: {
      addToScramble: (state, action: PayloadAction<Moves>) => {
         state.scramble += " " + action.payload;
      },
      setCubeArray: (state, action: PayloadAction<CubeArray>) => {
         state.cubeArray = action.payload;
      },
   },
});

export const { addToScramble, setCubeArray } = timer.actions;

export default timer.reducer;

