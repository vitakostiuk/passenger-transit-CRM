import { getDocsFromFirestore } from '../servises/firestore';

export const isExistEmail = async email => {
  const users = await getDocsFromFirestore();
  return users.some(user => user.email === email);
};

export const isExistPhone = async phone => {
  const users = await getDocsFromFirestore();
  return users.some(user => user.phoneNumber === phone);
};
