import { db } from '../config/firebaseConfig';
import { IScooter } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc,setDoc } from 'firebase/firestore';

export const addScooter = async (scooter: IScooter): Promise<IScooter> => {
  try {
    const scooterId = uuidv4();
    const newScooter = { ...scooter, id: scooterId };
    await setDoc(doc(collection(db, 'Scooters'), scooterId), newScooter);
    return newScooter;
  } catch (error) {
    console.error('Error adding scooter:', error);
    throw new Error('Error adding scooter');
  }
};

export const getScooters = async (): Promise<IScooter[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Scooters'));
    return querySnapshot.docs.map(doc => doc.data() as IScooter);
  } catch (error) {
    console.error('Error getting scooters:', error);
    throw new Error('Error getting scooters');
  }
};

export const updateScooter = async (scooterId: string, updatedScooter: Partial<IScooter>): Promise<void> => {
  try {
    await updateDoc(doc(collection(db, 'Scooters'), scooterId), updatedScooter);
  } catch (error) {
    console.error('Error updating scooter:', error);
    throw new Error('Error updating scooter');
  }
};

export const getScooterById = async (scooterId: string): Promise<IScooter | undefined> => {
  try {
    const docSnapshot = await getDoc(doc(collection(db, 'Scooters'), scooterId));
    return docSnapshot.exists() ? (docSnapshot.data() as IScooter) : undefined;
  } catch (error) {
    console.error('Error getting scooter by id:', error);
    throw new Error('Error getting scooter by id');
  }
};

export const deleteScooter = async (scooterId: string): Promise<void> => {
  try {
    await deleteDoc(doc(collection(db, 'Scooters'), scooterId));
  } catch (error) {
    console.error('Error deleting scooter:', error);
    throw new Error('Error deleting scooter');
  }
};
