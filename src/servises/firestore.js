import { db } from '../modules/Auth/config';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

export const addToFirestore = async userInfo => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userInfo);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    toast.error('Something went wrong');
    console.error('Error adding document: ', e);
  }
};

export const getDocsFromFirestore = async () => {
  const users = [];
  try {
    const result = await getDocs(collection(db, 'users'));

    result.forEach(doc => {
      const data = doc.data();
      const id = doc.id;

      users.push({ id, ...data });
    });

    return users;
  } catch (e) {
    toast.error('Something went wrong');
    console.error('Error', e);
  }
};

export const updateDataInFirestore = async (id, newData) => {
  try {
    const docRef = await doc(db, 'users', id);

    await updateDoc(docRef, newData);
    toast.success('User updated succeffuly');
  } catch (e) {
    toast.error('Something went wrong');
    console.error('Error updating document: ', e);
  }
};
