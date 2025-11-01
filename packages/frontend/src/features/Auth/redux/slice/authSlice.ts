import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/redux/store";

type AuthState = {
  authenticated?: boolean;
  user: object | null;
  token: string | null
}




const getIsAuthStatusInLocalStorage = () => {
  return window.localStorage.getItem("auth") === "true";
};

const initialAuthState = {
  authenticated: false || getIsAuthStatusInLocalStorage(),
  user: null,
  token: null
} as AuthState;
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Pick<AuthState, "user">>) => {
      const { user } = action.payload
      state.authenticated = true
      state.user = user
      //@ts-expect-error user is type object
      state.token = user?.stsTokenManager?.accessToken ?? ""
      window.localStorage.setItem("auth", "true");
    },
    setToken: (state, action: PayloadAction<Pick<AuthState, "token">>) => {
      const { token } = action.payload
      state.token = token
    },
    logOut: (state) => {
      state.authenticated = false
      state.user = null;
      state.token = null;
      window.localStorage.removeItem("auth");
    }
  }
})

export const { setCredentials, setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectCurrentToken = (state: RootState) => state.auth.token


export const selectCurrentUserAuth = createSelector(
  (state: RootState) => state.auth.user,
  (state: RootState) => state.auth.authenticated,
  (state: RootState) => state.auth.token,
  (user, authenticated, token) => ({
    user,
    authenticated,
    token
  })
);
