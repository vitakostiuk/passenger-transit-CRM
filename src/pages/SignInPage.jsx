import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/auth/authOperations';
import Auth from '../modules/Auth';
import Container from '../modules/common/Container';
import Paper from '../modules/common/Paper';

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
    <Container>
      <Paper>
        <Auth
          questionText="Need an account?"
          hash="register"
          buttonText="Sign In"
          buttonTextToNavigate="Sign Up"
          handleSetCredentials={handleSetCredentials}
          titleText="Sign in to Transit CRM"
          isSignIn
        />
      </Paper>
    </Container>
  );
};

export default SignInPage;
