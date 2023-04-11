import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/auth/authOperations';
import { getUserName, getUserEmail } from '../redux/auth/authSelectors';
import Auth from '../modules/Auth';
import { db } from '../modules/Auth/config';
import { collection, addDoc } from 'firebase/firestore';
import s from './Pages.module.css';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState(null);

  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserEmail);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signup(credentials));
    }
  }, [credentials, dispatch]);

  // useEffect(() => {
  //   if (token) {
  //     navigate('/');
  //   }
  // }, [navigate, token]);

  const fetchData = async () => {
    if (userName && userEmail) {
      const userInfo = {
        displayName: userName,
        email: userEmail,
      };

      try {
        const docRef = await addDoc(collection(db, 'users'), userInfo);
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const handleSetCredentials = data => {
    setCredentials(data);
    // fetchData();
  };

  return (
    <div className={s.homePageWrapper}>
      <div className={s.container}>
        <div className={s.paper}>
          {' '}
          <Auth
            questionText="Already have an account?"
            hash="login"
            buttonText="Sign Up"
            buttonTextToNavigate="Sign In"
            handleSetCredentials={handleSetCredentials}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
