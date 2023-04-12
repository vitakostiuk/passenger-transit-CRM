import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  getUser,
  signin,
  googleAuth,
  phoneNumberAuth,
  facebookAuth,
} from './authOperations';

const initialState = {
  user: { name: null, email: null },
  localId: null,
  token: null,
  loading: false,
  loadingUser: false,
  error: null,
  isClickSigninPhone: false,
  phoneNumber: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    setClickPhone: (state, { payload }) => {
      state.isClickSigninPhone = payload;
    },
  },
  extraReducers: builder => {
    builder
      // REDUCER FOR SIGN_UP
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.localId = payload.localId;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.idToken;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR SIGNIN
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.localId = payload.localId;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.idToken;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR GET_USER
      .addCase(getUser.pending, state => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.localId = payload.localId;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loadingUser = false;
        state.error = payload;
        state.token = null;
      })

      // REDUCER FOR GOOOGLE AUTH
      .addCase(googleAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.localId = payload.user.reloadUserInfo.localId;
        state.user.email = payload.user.email;
        state.user.name = payload.user.displayName;
        state.token = payload.user.accessToken;
      })
      .addCase(googleAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR PHONE NUMBER AUTH
      .addCase(phoneNumberAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(phoneNumberAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload?.accessToken;
        state.phoneNumber = payload?.phoneNumber;
      })
      .addCase(phoneNumberAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR FACEBOOK AUTH
      .addCase(facebookAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(facebookAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.user.email;
        state.user.name = payload.user.displayName;
        state.token = payload.user.accessToken;
      })
      .addCase(facebookAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logOut, setClickPhone } = authSlice.actions;

export default authSlice.reducer;
