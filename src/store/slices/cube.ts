import { ThreeByThree } from "@lib/cubes/ThreeByThree";
import { Moves } from "@lib/cubes/Moves";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

interface IState {
   currMove: Moves | null;
   rotateGroup: number[];
   cube: ThreeByThree;
   sideToMove: THREE.Object3D;
   currRotate: number;
}

const init = (): IState => {
   return {
      currMove: null,
      rotateGroup: [],
      cube: new ThreeByThree(),
      sideToMove: new THREE.Object3D(),
      currRotate: 0,
   };
};

const cube = createSlice({
   name: "cube",
   initialState: init(),
   reducers: {
      setCurrMove: (state, action) => {
         state.currMove = action.payload;
      },

      makeRotateGroup: (state, action: PayloadAction<Moves>) => {
         const { cube } = state;
         const face = action.payload;
         state.rotateGroup = [];
         const rotateGroup: any = [];
         for (const [key] of Object.entries(cube.stateMapping)) {
            const index = Number(key);
            if (
               index >= 0 &&
               index < 9 &&
               (face === Moves.F || face === Moves.Fi)
            ) {
               rotateGroup.push(index);
               //    sideToMove.add(refs.current[index]);
            } else if (
               index >= 18 &&
               index < 27 &&
               (face === Moves.B || face === Moves.Bi)
            ) {
               rotateGroup.push(index);
               //    sideToMove.add(refs.current[index]);
            } else if (
               ((index >= 0 && index < 4) ||
                  (index >= 9 && index < 12) ||
                  (index >= 18 && index < 21)) &&
               (face === Moves.D || face === Moves.Di)
            ) {
               rotateGroup.push(index);
               //    sideToMove.add(refs.current[index]);
            } else if (
               ((index >= 6 && index < 9) ||
                  (index >= 15 && index < 18) ||
                  (index >= 24 && index < 27)) &&
               (face === Moves.U || face === Moves.Ui)
            ) {
               rotateGroup.push(index);
               //    sideToMove.add(refs.current[index]);
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
               //    sideToMove.add(refs.current[index]);
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
               //    sideToMove.add(refs.current[index]);
            }
         }
         state.rotateGroup = rotateGroup;

         //  scene.add(sideToMove);
      },
      disolveRotateGroup: (state): void => {
         state.rotateGroup = [];
         state.currRotate = 0;
         state.currMove = null;
         state.sideToMove = new THREE.Object3D();
      },
      addToRotateGroup(state, action: PayloadAction<number>) {
         state.currRotate += action.payload;
         return state;
      },
   },
});

export const { setCurrMove, makeRotateGroup, disolveRotateGroup, addToRotateGroup } =
   cube.actions;

export default cube.reducer;

