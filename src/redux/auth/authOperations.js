import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, facebookProvider } from '../../modules/Auth/config';

axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_URL;
const API_KEY = process.env.REACT_APP_FIREBASE_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    const signUpData = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(`:signUp?key=${API_KEY}`, signUpData);

      console.log('data', data);

      return data;
    } catch (error) {
      toast.error(error.response.data.error.message);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `:signInWithPassword?key=${API_KEY}`,
        credentials
      );

      return data;
    } catch (error) {
      toast.error(error.response.data.error.message);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    const persistedToken = getState().auth.token;

    if (!persistedToken) {
      return rejectWithValue();
    }

    try {
      const body = { idToken: persistedToken };
      const { data } = await axios.post(`:lookup?key=${API_KEY}`, body);

      return data.users[0];
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await signInWithPopup(auth, provider);

      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

const phoneNumberAuth = createAsyncThunk(
  'auth/phoneNumberAuth',
  async (code, { rejectWithValue, getState }) => {
    try {
      if (code.length === 6) {
        // verify code
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(code);
        const user = result.user;

        return user;
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

const facebookAuth = createAsyncThunk(
  'auth/facebookAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await signInWithPopup(auth, facebookProvider);

      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export { signup, getUser, signin, googleAuth, phoneNumberAuth, facebookAuth };
