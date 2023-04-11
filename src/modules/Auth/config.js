import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from 'firebase/auth';

const API_KEY = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'passenger-transit-crm.firebaseapp.com',
  databaseURL:
    'https://passenger-transit-crm-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'passenger-transit-crm',
  storageBucket: 'passenger-transit-crm.appspot.com',
  messagingSenderId: '854799259232',
  appId: '1:854799259232:web:b4dd0fbd293a4d9e66d505',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, provider, facebookProvider };
