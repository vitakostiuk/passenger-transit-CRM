import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { phoneNumberAuth } from '../../../redux/auth/authOperations';
import 'firebase/compat/auth';
import { toast } from 'react-toastify';
import s from '../Auth.module.css';

const PhoneAuthForm = () => {
  const countryCode = '+380';
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [secretCode, setSecretCode] = useState('');

  const dispatch = useDispatch();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: response => {},
      },
      auth
    );
  };

  const requestSectretCode = e => {
    e.preventDefault();
    if (phoneNumber.length >= 13) {
      setExpandForm(true);
      generateRecaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
        })
        .catch(error => {
          toast.error('Too many requests. Try again later');
        });
    }
  };

  const verifySecretCode = e => {
    setSecretCode(e.target.value);
    dispatch(phoneNumberAuth(e.target.value));
  };

  return (
    <form onSubmit={requestSectretCode}>
      <label className={s.label} htmlFor="phone">
        Phone number
      </label>
      <input
        id="phone"
        className={s.input}
        name="phone"
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      {expandForm ? (
        <>
          <label className={s.label} htmlFor="phone">
            Secret code
          </label>
          <input
            id="code"
            className={s.input}
            name="code"
            type="text"
            placeholder="Enter the code sent to your phone"
            value={secretCode}
            onChange={verifySecretCode}
          />
        </>
      ) : null}

      {!expandForm && <button type="submit">Request secret code</button>}

      <div id="recaptcha-container"></div>
    </form>
  );
};

export default PhoneAuthForm;
