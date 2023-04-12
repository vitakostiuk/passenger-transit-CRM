import { useDispatch } from 'react-redux';
import { setClickPhone } from '../../../redux/auth/authSlice';
import { Button } from 'bootstrap-4-react';
import { FaPhone } from 'react-icons/fa';

const PhoneAuth = () => {
  const dispatch = useDispatch();

  const handlePhoneSignIn = () => {
    dispatch(setClickPhone(true));
  };
  return (
    <Button light type="button" onClick={handlePhoneSignIn}>
      <FaPhone size={40} color="#4f65f1" />
    </Button>
  );
};

export default PhoneAuth;
