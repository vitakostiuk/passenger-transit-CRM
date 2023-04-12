import { useState, useEffect } from 'react';
import { updateDataInFirestore } from '../../../servises/firestore';
import { Button, Form } from 'bootstrap-4-react';
import s from './EditUserForm.module.css';

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
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.title}>Edit User Info</div>
        <Form onSubmit={handleSubmit} className={s.form}>
          <Form.Group>
            <label className={s.label} htmlFor="displayName">
              Display Name
            </label>
            <Form.Input
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
            <Form.Input
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
            <Form.Input
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
            <Form.Input
              id="role"
              className={s.input}
              name="role"
              type="text"
              value={role}
              onChange={e => setRole(e.target.value)}
            />

            <Button primary lg type="submit" className={s.button}>
              EDIT USER
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default EditUserForm;
