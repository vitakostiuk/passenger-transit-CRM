import { useDispatch } from 'react-redux';
import { setClickPhone } from '../../../redux/auth/authSlice';

const PhoneAuth = () => {
  const dispatch = useDispatch();

  const handlePhoneSignIn = () => {
    dispatch(setClickPhone());
  };
  return (
    <button type="button" onClick={handlePhoneSignIn}>
      Sign In with Phone Number
    </button>
  );
};

export default PhoneAuth;
