import logger from "redux-logger";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import colorMode from "@store/slices/color-mode";
import cube from "@store/slices/cube";
import timer from "@store/slices/timer";
const makeStore = () =>
   configureStore({
      reducer: {
         colorMode,
         cube,
         timer,
      },
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(thunk).concat(logger),
   });

const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

