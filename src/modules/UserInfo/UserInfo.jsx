import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';

import PropTypes from 'prop-types';
import s from './UserInfo.module.css';

const UserInfo = ({ username }) => {
  return (
    <div className={s.container}>
      <span>
        <IoPersonCircle color="#4f65f1" size="24" />
      </span>
      <b className={s.name}>{username}</b>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserInfo;
