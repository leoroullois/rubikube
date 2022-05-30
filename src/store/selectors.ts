import { RootState } from "@store/store";

export const selectCube = (state: RootState) => state.cube;
export const selectTimer = (state: RootState) => state.timer;

