import { db } from '../config/firebaseConfig';
import { IUser } from '../interfaces';
import { v4 as uuid } from 'uuid';
 
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, CollectionReference,deleteDoc,query,where } from 'firebase/firestore';

 
const usersCollection = (): CollectionReference<IUser> => collection(db, 'Users') as CollectionReference<IUser>;

export const addUser = async (userDni:string): Promise<IUser> => {
  try {
    const userId = uuid();
    const cleanUserData = {
      id: userId,
      dni: userDni, 
      available_minutes: 0,
      historicMinutesRented:0,
      rentedScooterId:null,
      bonusMinutes:0,
      punishment:false
    };
    await setDoc(doc(usersCollection(), userId),cleanUserData);
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

export const getUserByDni = async (dni: string): Promise<IUser | undefined> => {
  try {
    const q = query(usersCollection(), where("dni", "==", dni));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return docSnap.data() as IUser;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error getting user by DNI:', error);
    throw new Error('Error getting user by DNI');
  }
};

export const updateUserByDni = async (dni: string, updatedUser: Partial<IUser>): Promise<void> => {
  try {
    const q = query(usersCollection(), where("dni", "==", dni));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userId = querySnapshot.docs[0].id;
      await setDoc(doc(usersCollection(), userId), updatedUser, { merge: true });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error updating user by DNI:', error);
    throw new Error('Error updating user by DNI');
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