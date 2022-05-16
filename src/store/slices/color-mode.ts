import { createReducer, createSlice } from "@reduxjs/toolkit";

enum ColorMode {
   light = "light",
   dark = "dark",
   system = "system",
}
interface IState {
   colorMode: ColorMode;
}

const init = () => {
   return {
      colorMode: ColorMode.light,
   };
};

const colorMode = createSlice({
   name: "color-mode",
   initialState: init(),
   reducers: {
      toggleColorMode: (state) => {
         if (state.colorMode === ColorMode.light) {
            state.colorMode = ColorMode.dark;
         } else {
            state.colorMode = ColorMode.light;
         }
      },
   },
});

export const { toggleColorMode } = colorMode.actions;

export default colorMode.reducer;

