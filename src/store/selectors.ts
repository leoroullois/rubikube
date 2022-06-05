import { RootState } from "@store/store";

export const selectCube = (state: RootState) => state.cube;
export const selectTimer = (state: RootState) => state.timer;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

