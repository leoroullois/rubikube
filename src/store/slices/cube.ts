import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { Moves } from "@lib/cubes/Moves";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

interface IState {
  currMove: Moves | null;
  rotateGroup: number[];
  currRotate: number;
}

const init = (): IState => {
  return {
    currMove: null,
    rotateGroup: [],
    currRotate: 0,
  };
};

const cube = createSlice({
  name: "cube",
  initialState: init(),
  reducers: {
    setCurrMove: (state, action: PayloadAction<Moves | null>) => {
      state.currMove = action.payload;
    },
    makeRotateGroup: (state, action: PayloadAction<Moves>) => {
      const face = action.payload;
      state.rotateGroup = [];
      const rotateGroup: number[] = [];
      const mainGroup: number[] = [];
      for (let key = 0; key < 27; key++) {
        const index = Number(key);
        if (
          index >= 0 &&
          index < 9 &&
          (face === Moves.F || face === Moves.Fi)
        ) {
          rotateGroup.push(index);
        } else if (
          index >= 18 &&
          index < 27 &&
          (face === Moves.B || face === Moves.Bi)
        ) {
          rotateGroup.push(index);
        } else if (
          ((index >= 0 && index < 3) ||
            (index >= 9 && index < 12) ||
            (index >= 18 && index < 21)) &&
          (face === Moves.D || face === Moves.Di)
        ) {
          rotateGroup.push(index);
        } else if (
          ((index >= 6 && index < 9) ||
            (index >= 15 && index < 18) ||
            (index >= 24 && index < 27)) &&
          (face === Moves.U || face === Moves.Ui)
        ) {
          rotateGroup.push(index);
        } else if (
          (index === 0 ||
            index === 9 ||
            index === 18 ||
            index === 3 ||
            index === 12 ||
            index === 21 ||
            index === 6 ||
            index === 15 ||
            index === 24) &&
          (face === Moves.R || face === Moves.Ri)
        ) {
          rotateGroup.push(index);
        } else if (
          (index === 2 ||
            index === 11 ||
            index === 20 ||
            index === 5 ||
            index === 14 ||
            index === 23 ||
            index === 8 ||
            index === 17 ||
            index === 26) &&
          (face === Moves.L || face === Moves.Li)
        ) {
          rotateGroup.push(index);
        }
      }
      state.rotateGroup = rotateGroup;
    },
    disolveRotateGroup: (state): void => {
      state.currRotate = 0;
      state.currMove = null;
      // state.rotateGroup = [];
    },
    addToCurrRotate(state, action: PayloadAction<number>) {
      state.currRotate += action.payload;
      return state;
    },
    resetCurrRotate(state): void {
      state.currRotate = 0;
    },
  },
});

export const {
  setCurrMove,
  makeRotateGroup,
  disolveRotateGroup,
  addToCurrRotate,
  resetCurrRotate,
} = cube.actions;

export default cube.reducer;
