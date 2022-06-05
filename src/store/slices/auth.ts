import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
} from "@firebase/auth";
import { auth } from "firebase.config";
import { FirebaseError } from "firebase/app";

interface IAuth {
   email: string;
   password: string;
   password2?: string;
}
interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   createdAt: string;
   updatedAt: string;
}
interface State {
   isAuthenticated: boolean;
   isLoading: boolean;
   user: any;
}

const init = (): State => {
   return {
      isAuthenticated: false,
      isLoading: false,
      user: {
         id: "",
         name: "",
         email: "",
         password: "",
         createdAt: "",
         updatedAt: "",
      },
   };
};

export const register = createAsyncThunk(
   "auth/register",
   async (user: IAuth, { rejectWithValue }) => {
      try {
         const userCredentials = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
         );
         console.log("userCredentials", userCredentials);
         return user as any;
      } catch (err) {
         const error = err as FirebaseError;
         console.error(err);
         return rejectWithValue(error.message);
      }
   }
);

export const login = createAsyncThunk(
   "auth/login",
   async (user: IAuth, { rejectWithValue }) => {
      try {
         const userCredentials = await signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
         );
         console.log("userCredentials", userCredentials);
         return user as any;
      } catch (err) {
         console.error(err);
         return rejectWithValue(err);
      }
   }
);

export const logout = createAsyncThunk(
   "auth/logout",
   async (_, { rejectWithValue }) => {
      try {
         await signOut(auth);
         return { message: "Sign out successfully" };
      } catch (err) {
         console.error(err);
         return rejectWithValue(err);
      }
   }
);

const authSlice = createSlice({
   name: "auth",
   initialState: init(),
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(register.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(register.rejected, (state) => {
         state = init();
      });
      builder.addCase(
         register.fulfilled,
         (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
         }
      );

      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.rejected, (state) => {
         state.isLoading = false;
      });
      builder.addCase(
         login.fulfilled,
         (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            
            console.log("action.payload", action.payload);
            state.user = action.payload;
         }
      );

      builder.addCase(logout.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(logout.rejected, (state) => {
         state.isLoading = false;
      });
      builder.addCase(logout.fulfilled, () => {
         return init();
      });
   },
});

export default authSlice.reducer;

