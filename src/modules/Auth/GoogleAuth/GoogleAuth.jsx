import { useDispatch } from 'react-redux';
import { googleAuth } from '../../../redux/auth/authOperations';
import { setClickPhone } from '../../../redux/auth/authSlice';
import { Button } from 'bootstrap-4-react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = () => {
  const dispatch = useDispatch(googleAuth);

  const handleSignInWithGoogle = () => {
    dispatch(setClickPhone(false));
    dispatch(googleAuth());
  };
  return (
    <Button light type="button" onClick={handleSignInWithGoogle}>
      <FcGoogle size={40} color="#4f65f1" />
    </Button>
  );
};

export default GoogleAuth;
