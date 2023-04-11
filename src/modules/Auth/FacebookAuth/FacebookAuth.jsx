import { useDispatch } from 'react-redux';
import { facebookAuth } from '../../../redux/auth/authOperations';

const FacebookAuth = () => {
  const dispatch = useDispatch();

  const handleFacebookAuth = () => {
    dispatch(facebookAuth());
  };
  return (
    <button type="button" onClick={handleFacebookAuth}>
      Sign In with Facebook
    </button>
  );
};

export default FacebookAuth;
