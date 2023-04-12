import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  getUserName,
  getToken,
  getPhoneNumber,
} from '../../redux/auth/authSelectors';
import { logOut } from '../../redux/auth/authSlice.js';
import UserInfo from '../UserInfo/UserInfo';
import BurgerMenu from './BurgerMenu';
import { CiMenuBurger } from 'react-icons/ci';
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
    <div className={s.container}>
      {token && (
        <CiMenuBurger onClick={toggleBurger} color="#4f65f1" size="34" />
      )}

      {isClickBurger && <BurgerMenu handleClickItem={toggleBurger} />}

      <div className={s.authContainer}>
        {!token && (
          <button
            className={s.signin}
            type="button"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
        {!token && (
          <button
            className={s.signup}
            type="button"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        )}
        <div>
          {token && (
            <UserInfo
              username={userName ? userName : phoneNumber ? phoneNumber : ''}
            />
          )}
        </div>

        {token && (
          <button className={s.logout} type="button" onClick={handleLogOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
