import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/auth/authOperations';
import Auth from '../modules/Auth';
import Container from '../modules/common/Container';
import Paper from '../modules/common/Paper';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials) {
      dispatch(signup(credentials));
    }
  }, [credentials, dispatch]);

  const handleSetCredentials = data => {
    setCredentials(data);
  };

  return (
    <Container>
      <Paper>
        <Auth
          questionText="Already have an account?"
          hash="login"
          buttonText="Sign Up"
          buttonTextToNavigate="Sign In"
          handleSetCredentials={handleSetCredentials}
          titleText="Sign up to Transit CRM"
        />
      </Paper>
    </Container>
  );
};

export default SignUpPage;
