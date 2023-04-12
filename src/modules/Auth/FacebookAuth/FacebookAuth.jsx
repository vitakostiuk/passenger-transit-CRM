import { useDispatch } from 'react-redux';
import { facebookAuth } from '../../../redux/auth/authOperations';
import { Button } from 'bootstrap-4-react';
import { BsFacebook } from 'react-icons/bs';

const FacebookAuth = () => {
  const dispatch = useDispatch();

  const handleFacebookAuth = () => {
    dispatch(facebookAuth());
  };
  return (
    <Button light type="button" onClick={handleFacebookAuth}>
      <BsFacebook size={40} color="#4f65f1" />
    </Button>
  );
};

export default FacebookAuth;
