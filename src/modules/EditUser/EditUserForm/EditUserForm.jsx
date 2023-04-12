import { useState, useEffect } from 'react';
import { updateDataInFirestore } from '../../../servises/firestore';
import s from '../../Auth/Auth.module.css';

const EditUserForm = ({ userInfo, handleUpdateUser }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setDisplayName(userInfo.displayName);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);
    setRole(userInfo.role);
    setUserID(userInfo.id);
  }, [userInfo]);

  const handleSubmit = async e => {
    await e.preventDefault();

    const data = {
      displayName,
      email,
      phoneNumber,
      role,
    };

    try {
      updateDataInFirestore(userID, data);
    } catch (error) {
      console.log(error);
    }

    handleUpdateUser();

    setDisplayName('');
    setEmail('');
    setPhoneNumber('');
    setRole('');
    setUserID('');
  };

  return (
    <div>
      <div>Edit User Info</div>
      <form onSubmit={handleSubmit}>
        <label className={s.label} htmlFor="displayName">
          Display Name
        </label>
        <input
          id="displayName"
          className={s.input}
          name="displayName"
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />

        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={s.input}
          name="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className={s.label} htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          className={s.input}
          name="phone"
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />

        <label className={s.label} htmlFor="role">
          Role
        </label>
        <input
          id="role"
          className={s.input}
          name="role"
          type="text"
          value={role}
          onChange={e => setRole(e.target.value)}
        />

        <button type="submit">EDIT USER</button>
      </form>
    </div>
  );
};

export default EditUserForm;
