import { useState } from 'react';
import { getDocsFromFirestore } from '../../../servises/firestore';

const UsersList = ({ onClickItem }) => {
  const [isClickBtn, setIsClickBtn] = useState(false);
  const [usersList, setUsersList] = useState(null);

  const handleClickBtn = async () => {
    await setIsClickBtn(prev => !prev);
    try {
      const result = await getDocsFromFirestore();
      console.log('result', result);
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
    <>
      <button type="button" onClick={handleClickBtn}>
        See all users
      </button>
      {isClickBtn && usersList && (
        <ul>
          {usersList.map(({ displayName, email, phoneNumber, role, id }) => (
            <li
              key={email}
              onClick={() =>
                handleClickItem(displayName, email, phoneNumber, role, id)
              }
            >
              {email ? email : phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UsersList;
