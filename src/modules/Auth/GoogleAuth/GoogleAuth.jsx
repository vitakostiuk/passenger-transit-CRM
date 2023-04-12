import { useDispatch } from 'react-redux';
import { googleAuth } from '../../../redux/auth/authOperations';
import { Button } from 'bootstrap-4-react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = () => {
  const dispatch = useDispatch(googleAuth);

  const handleSignInWithGoogle = () => {
    dispatch(googleAuth());
  };
  return (
    <Button light type="button" onClick={handleSignInWithGoogle}>
      <FcGoogle size={40} color="#4f65f1" />
    </Button>
  );
};

export default GoogleAuth;
