import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../redux/auth/authOperations';
import Auth from '../modules/Auth';
import s from './Pages.module.css';

const SignInPage = () => {
  const [credentials, setCredentials] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signin(credentials));
    }
  }, [credentials, dispatch]);

  const handleSetCredentials = data => {
    setCredentials(data);
  };
  return (
    <div>
      <div className={s.container}>
        <div className={s.paper}>
          {' '}
          <Auth
            questionText="Need an account?"
            hash="register"
            buttonText="Sign In"
            buttonTextToNavigate="Sign Up"
            handleSetCredentials={handleSetCredentials}
            isSignIn
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
