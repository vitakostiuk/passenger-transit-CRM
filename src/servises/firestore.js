import { db } from '../modules/Auth/config';
import { collection, addDoc } from 'firebase/firestore';

export const addToFirestore = async userInfo => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userInfo);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
