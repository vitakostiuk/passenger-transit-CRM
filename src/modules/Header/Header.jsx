import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserName,
  getToken,
  getPhoneNumber,
} from '../../redux/auth/authSelectors';
import { logOut } from '../../redux/auth/authSlice.js';
import UserInfo from '../UserInfo/UserInfo';
import BurgerMenu from './BurgerMenu';
import { CiMenuBurger } from 'react-icons/ci';

import { Button } from 'bootstrap-4-react';
import s from './Header.module.css';

const Header = () => {
  const [isClickBurger, setIsClickBurger] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector(getUserName);
  const token = useSelector(getToken);
  const phoneNumber = useSelector(getPhoneNumber);

  const toggleBurger = e => {
    setIsClickBurger(prev => !prev);
  };

  const handleLogOut = () => dispatch(logOut());
  return (
    <div className={token ? s.containerWithBurger : s.container}>
      {token && (
        <CiMenuBurger onClick={toggleBurger} color="#4f65f1" size="34" />
      )}

      {isClickBurger && <BurgerMenu handleClickItem={toggleBurger} />}

      <div className={s.authContainer}>
        {!token && (
          <Button
            className={s.signin}
            dark
            outline
            type="button"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        )}
        {!token && (
          <Button dark type="button" onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        )}
        <div>
          {token && (
            <UserInfo
              username={userName ? userName : phoneNumber ? phoneNumber : ''}
            />
          )}
        </div>

        {token && (
          <Button dark outline type="button" onClick={handleLogOut}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
