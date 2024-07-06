import { db } from '../config/firebaseConfig';
import { IUser } from '../interfaces';
import { v4 as uuid } from 'uuid';
 
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, CollectionReference,deleteDoc } from 'firebase/firestore';

 
const usersCollection = (): CollectionReference<IUser> => collection(db, 'Users') as CollectionReference<IUser>;

export const addUser = async (user: IUser): Promise<IUser> => {
  try {
    const userId = uuid();
    const cleanUserData = {
      id: userId,
      dni: user.dni, 
      available_minutes: user.available_minutes,
    };
    console.log(cleanUserData)
    const example={
      id:"4564",
      dni:"44564",
      available_minutes:455
    }
    await setDoc(doc(usersCollection(), userId), example);
    return cleanUserData
  } catch (error) {
    console.log(error)
    throw new Error('Error adding user');
  }
};

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const querySnapshot = await getDocs(usersCollection());
    const users: IUser[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as IUser);
    });
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw new Error('Error getting users');
  }
};

export const updateUser = async (userId: string, updatedUser: Partial<IUser>): Promise<void> => {
  try {
    await setDoc(doc(usersCollection(), userId), updatedUser, { merge: true });
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};

export const getUserById = async (userId: string): Promise<IUser | undefined> => {
  try {
    const docSnap = await getDoc(doc(usersCollection(), userId));
    if (docSnap.exists()) {
      return docSnap.data() as IUser;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw new Error('Error getting user by id');
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(usersCollection(), userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};