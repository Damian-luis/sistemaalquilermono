import { db } from '../config/firebaseConfig';
import { IStation } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc,setDoc,arrayUnion } from 'firebase/firestore';

export const addStation = async (station: IStation): Promise<IStation> => {
  try {
    const stationId = uuidv4();
    const newStation = { ...station, id: stationId,scooters:[] };
    await setDoc(doc(collection(db, 'Stations'), stationId), newStation);
    return newStation;
  } catch (error) {
    console.error('Error adding station:', error);
    throw new Error('Error adding station');
  }
};

export const getStations = async (): Promise<IStation[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Stations'));
    return querySnapshot.docs.map(doc => doc.data() as IStation);
  } catch (error) {
    console.error('Error getting stations:', error);
    throw new Error('Error getting stations');
  }
};

export const updateStation = async (stationId: string, newScooter: any): Promise<void> => {
  try {
    await updateDoc(doc(collection(db, 'Stations'), stationId), {
      scooters: arrayUnion(newScooter.scooter)
    });
  } catch (error) {
    console.error('Error updating station:', error);
    throw new Error('Error updating station');
  }

};

export const getStationById = async (stationId: string): Promise<IStation | undefined> => {
  try {
    const docSnapshot = await getDoc(doc(collection(db, 'Stations'), stationId));
    return docSnapshot.exists() ? (docSnapshot.data() as IStation) : undefined;
  } catch (error) {
    console.error('Error getting station by id:', error);
    throw new Error('Error getting station by id');
  }
};

export const deleteStation = async (stationId: string): Promise<void> => {
  try {
    await deleteDoc(doc(collection(db, 'Stations'), stationId));
  } catch (error) {
    console.error('Error deleting station:', error);
    throw new Error('Error deleting station');
  }
};
