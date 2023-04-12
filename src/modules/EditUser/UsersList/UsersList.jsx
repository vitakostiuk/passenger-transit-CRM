import { useState } from 'react';
import { getDocsFromFirestore } from '../../../servises/firestore';
import { Button, ListGroup } from 'bootstrap-4-react';
import s from './UserList.module.css';

const UsersList = ({ onClickItem }) => {
  const [isClickBtn, setIsClickBtn] = useState(false);
  const [usersList, setUsersList] = useState(null);

  const handleClickBtn = async () => {
    await setIsClickBtn(prev => !prev);
    try {
      const result = await getDocsFromFirestore();
      setUsersList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickItem = (displayName, email, phoneNumber, role, id) => {
    const data = {
      displayName,
      email,
      phoneNumber,
      role,
      id,
    };

    onClickItem(data);
  };

  return (
    <div className={s.container}>
      <Button primary lg type="button" onClick={handleClickBtn}>
        See all users
      </Button>
      {isClickBtn && usersList && (
        <ListGroup>
          {usersList.map(({ displayName, email, phoneNumber, role, id }) => (
            <ListGroup.Link
              key={email}
              onClick={() =>
                handleClickItem(displayName, email, phoneNumber, role, id)
              }
            >
              {email ? email : phoneNumber}
            </ListGroup.Link>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default UsersList;
