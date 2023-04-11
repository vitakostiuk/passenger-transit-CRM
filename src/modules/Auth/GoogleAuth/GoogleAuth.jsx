import { useDispatch } from 'react-redux';
import { googleAuth } from '../../../redux/auth/authOperations';

const GoogleAuth = () => {
  const dispatch = useDispatch(googleAuth);

  const handleSignInWithGoogle = () => {
    dispatch(googleAuth());
  };
  return (
    <button type="button" onClick={handleSignInWithGoogle}>
      Sign In with Google
    </button>
  );
};

export default GoogleAuth;
