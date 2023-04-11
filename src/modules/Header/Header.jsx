import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
// import { ReactComponent as Logo } from '../../images/main-logo1.svg';
import {
  getUserName,
  getToken,
  getPhoneNumber,
} from '../../redux/auth/authSelectors';
import { logOut } from '../../redux/auth/authSlice.js';
import UserInfo from '../UserInfo/UserInfo';
import s from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector(getUserName);
  const token = useSelector(getToken);
  const phoneNumber = useSelector(getPhoneNumber);

  // Клік по home або leaderboard
  const onClickNavItem = () => {
    setTimeout(() => {
      window.location.reload(false);
    });
  };

  // Клік по логотипу
  const onClickLogo = () => {
    navigate('/');

    setTimeout(() => {
      window.location.reload(false);
    });
  };

  const handleLogOut = () => dispatch(logOut());
  return (
    <div className={s.container}>
      {token && <div>MENU</div>}
      {/* <div onClick={onClickLogo}>
        Logo
        <Logo className={s.logo} />
      </div> */}
      {/* <div className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          Home
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          Leaderboard
        </NavLink>
      </div> */}

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
