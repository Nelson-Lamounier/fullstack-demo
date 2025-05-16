import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the user object
export interface User {
  uid: string;
  username: string | null;
  email: string | null;
  [key: string]: any;
}

// Define the initial state structure
export interface UserState {
  currentUser: User | null;
  additionalDetails: Record<string, any> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  additionalDetails: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    checkUserSession(_state) {
      // No changes needed in the state here, but you may trigger a side effect in middleware
    },
    googleSignInStart(_state, _action: PayloadAction<string>) {
      // No direct state change, might be used in middleware
    },
    emailSignInStart(
      _state,
      _action: PayloadAction<{ email: string; password: string }>
    ) {
      // No direct state change, but passing payload (email, password)
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload.message;
    },
    signUpStart(
      _state,
      _action: PayloadAction<{
        email: string;
        password: string;
        username: string;
        receiveEmails: boolean;
      }>
    ) {},
    signUpSuccess(
      state,
      action: PayloadAction<{
        user: User;
        additionalDetails: Record<string, any>;
      }>
    ) {
      const { user, additionalDetails } = action.payload;
      state.currentUser = { ...user, ...additionalDetails };
      state.error = null;
    },
    signUpFailed(_state, _action: PayloadAction<Error>) {},
    signOutStart(_state) {},
    signOutSuccess(state) {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailed(_state, _action: PayloadAction<Error>) {},
  },
});

export const {
  setCurrentUser,
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
