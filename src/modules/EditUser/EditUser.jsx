import { useState } from 'react';
import UsersList from './UsersList/UsersList';
import EditUserForm from './EditUserForm/EditUserForm';

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
    <div>
      <UsersList onClickItem={onClickItem} />
      {userInfo && !isUpdated && (
        <EditUserForm userInfo={userInfo} handleUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
};

export default EditUser;
