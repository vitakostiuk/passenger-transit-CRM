import { useState } from 'react';
import UsersList from './UsersList/UsersList';
import EditUserForm from './EditUserForm/EditUserForm';
import s from './EditUser.module.css';

const EditUser = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onClickItem = data => {
    setUserInfo(data);
    setIsUpdated(false);
  };

  const handleUpdateUser = () => {
    setIsUpdated(true);
  };
  return (
    <div className={s.container}>
      <UsersList onClickItem={onClickItem} />
      {userInfo && !isUpdated && (
        <EditUserForm userInfo={userInfo} handleUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
};

export default EditUser;
