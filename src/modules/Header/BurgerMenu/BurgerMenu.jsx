import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../../redux/auth/authSelectors';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.const';
import s from './BurgerMenu.module.css';

const BurgerMenu = ({ handleClickItem }) => {
  const email = useSelector(getUserEmail);

  const isAdmin = email === process.env.REACT_APP_ADMIN;

  const onClickNavItem = () => {
    handleClickItem();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClickItem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickItem]);

  const handleBackdropClick = e => {
    console.log('e.target', e.target);
    console.log('e.currentTarget', e.currentTarget);
    if (e.currentTarget === e.target) {
      handleClickItem();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.popup}>
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
    </div>
  );
};

export default BurgerMenu;
