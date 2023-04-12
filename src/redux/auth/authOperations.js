import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, facebookProvider } from '../../modules/Auth/config';
import { addToFirestore } from '../../servises/firestore';
import { getDocsFromFirestore } from '../../servises/firestore';
import { isExistEmail, isExistPhone } from '../../utils/isExist';

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;
const API_KEY = process.env.REACT_APP_FIREBASE_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    const signUpData = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:signUp?key=${API_KEY}`,
        signUpData
      );

      addToFirestore({
        displayName: data.displayName,
        email: data.email,
        phoneNumber: '',
        role: 'passenger',
      });

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
        `${BASE_URL}:signInWithPassword?key=${API_KEY}`,
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
      const { data } = await axios.post(
        `${BASE_URL}:lookup?key=${API_KEY}`,
        body
      );

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

      const isExist = await isExistEmail(data.user.email);

      if (!isExist) {
        addToFirestore({
          displayName: data.user.displayName,
          email: data.user.email,
          phoneNumber: '',
          role: 'passenger',
        });
      }

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

        const isExist = await isExistPhone(user.phoneNumber);

        if (!isExist) {
          addToFirestore({
            displayName: '',
            email: '',
            phoneNumber: user.phoneNumber,
            role: 'passenger',
          });
        }

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

      const isExist = await isExistEmail(data.user.email);

      if (!isExist) {
        addToFirestore({
          displayName: data.user.displayName,
          email: data.user.email,
          phoneNumber: '',
          role: 'passenger',
        });
      }

      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export { signup, getUser, signin, googleAuth, phoneNumberAuth, facebookAuth };
