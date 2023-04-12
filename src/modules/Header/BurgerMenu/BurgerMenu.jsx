import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../../redux/auth/authSelectors';
import { useNavigate, NavLink } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.const';
import s from './BurgerMenu.module.css';

const BurgerMenu = ({ handleClickItem }) => {
  const navigate = useNavigate();

  const email = useSelector(getUserEmail);

  const isAdmin = email === process.env.REACT_APP_ADMIN;

  const onClickNavItem = () => {
    handleClickItem();
  };

  return (
    <div className={s.container}>
      <NavLink
        to={ROUTES.DASHBOARD}
        className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
        onClick={onClickNavItem}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={ROUTES.CREATE_TRIP}
        className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
        onClick={onClickNavItem}
      >
        Create Trip
      </NavLink>
      {isAdmin && (
        <NavLink
          to={ROUTES.EDIT_USERS}
          className={({ isActive }) => (isActive ? s.activeStyle : s.navItem)}
          onClick={onClickNavItem}
        >
          Edit Users
        </NavLink>
      )}
    </div>
  );
};

export default BurgerMenu;
