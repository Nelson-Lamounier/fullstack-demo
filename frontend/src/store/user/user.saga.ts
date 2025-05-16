import { put, all, call, takeLatest } from "typed-redux-saga/macro";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  signInApi,
  googleSignInApi,
  signOutApi,
  GoogleSignInResponse,
  signUpApi,
  getCurrentUser,
} from "../../api/user.api";

import {
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
  checkUserSession,
} from "./user.slice";



export function* getSnapshotFromUserAuth(
  userAuth: { email: string; password: string },
  additionalDetails?: Record<string, any>
) {
  try {
    // Call the sign-in API to fetch user data
    const userData = yield* call(signInApi, userAuth);

    // If additional details exist, merge them with user data
    const userWithDetails = { ...userData, ...additionalDetails };

    // Dispatch the sign-in success action with user data
    yield* put(signInSuccess(userWithDetails));
  } catch (error) {
    // Dispatch sign-in failed action if the API call fails
    yield* put(signInFailed(error as Error));
  }
}

// Worker Saga: Handles email sign-in
export function* signInWithEmail(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const { email, password } = action.payload;
    const userData = yield* call(signInApi, { email, password });
    localStorage.setItem("token", userData.token); // Store token in localStorage
    yield* put(signInSuccess(userData.user));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* put(signInSuccess(userAuth));
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

// Worker Saga: Handles Google Sign-In
export function* signInWithGoogle(action: PayloadAction<string>) {
  try {
    const token = action.payload;
    const userData: GoogleSignInResponse = yield* call(googleSignInApi, token);
    localStorage.setItem("token", userData.token); // Store token in localStorage
    yield* put(signInSuccess(userData.user));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp(
  action: PayloadAction<{
    username: string;
    email: string;
    password: string;
    receiveEmails: boolean;
  }>
) {
  try {
    const { username, email, password } = action.payload; // Destructure `username`
    const UserCredential = yield* call(signUpApi, action.payload);
    if (UserCredential) {
      const { user } = UserCredential;
      yield* put(signUpSuccess({ user:{...user, email}, additionalDetails: { username, password } }));
      localStorage.setItem("token", UserCredential.token); // Store token after successful sign-up
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

// Worker Saga: Handles sign-out
export function* signOut() {
  try {
    yield* call(signOutApi);
    localStorage.removeItem("token"); // Remove token from localStorage
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: PayloadAction<{
  user: { email: string; password: string };
  additionalDetails:{ password: string };
}>) {
  try {
    const { email } = user; // Extract email
    const { password } = additionalDetails; // Extract password
    // Call the existing getSnapshotFromUserAuth to handle sign-in logic after sign-up
    if (!email || !password) {
        throw new Error("Email and password are required");
      }
    yield* call(getSnapshotFromUserAuth, { email, password });
  } catch (error) {
    // Handle any errors during the sign-in process
    yield* put(signInFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

// Watcher Sagas: Watch for actions and delegate to worker sagas
function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(signUpStart.type, signUp);
}
export function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInWithGoogle);
}

function* onSignOuStart() {
  yield* takeLatest(signOutStart.type, signOut);
}

// Combine all sagas into a root saga
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOuStart),
    call(onSignUpSuccess),
    call(onSignUpStart),
  ]);
}
