import { db } from '../config/firebaseConfig';
import { IRental } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, CollectionReference,deleteDoc,query,where } from 'firebase/firestore';

export const addRental = async (rental: IRental): Promise<IRental> => {
  try {
    console.log(rental)
    const rentalId = uuidv4();
    const newRental = { ...rental, id: rentalId };
    await setDoc(doc(collection(db, 'Rentals'), rentalId), newRental);
    return newRental;
  } catch (error) {
    console.error('Error adding rental:', error);
    throw new Error('Error adding rental');
  }
};

export const getRentals = async (): Promise<IRental[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Rentals'));
    return querySnapshot.docs.map(doc => doc.data() as IRental);
  } catch (error) {
    console.error('Error getting rentals:', error);
    throw new Error('Error getting rentals');
  }
};

export const updateRental = async (rentalId: string, updatedRental: Partial<IRental>): Promise<void> => {
  try {
    await updateDoc(doc(collection(db, 'Rentals'), rentalId), updatedRental);
  } catch (error) {
    console.error('Error updating rental:', error);
    throw new Error('Error updating rental');
  }
};

export const getRentalById = async (rentalId: string): Promise<IRental | undefined> => {
  try {
    console.log("intenta entrar")
    console.log(rentalId)
    const docSnapshot = await getDoc(doc(collection(db, 'Rentals'), rentalId));
    return docSnapshot.exists() ? (docSnapshot.data() as IRental) : undefined;
  } catch (error) {
    console.log("obtuvo error")
    console.error('Error getting rental by id:', error);
    throw new Error('Error getting rental by id');
  }
};

export const getRentalsByUserDni = async (userDni: string): Promise<IRental[]> => {
  try {
    const rentalsRef = collection(db, 'Rentals');
    const querySnapshot = await getDocs(rentalsRef);
    const rentals: IRental[] = [];

    querySnapshot.forEach((doc) => {
      const rentalData = doc.data() as any;
      if (rentalData.rental.user_dni === userDni) {
        
        rentals.push(rentalData);
      }
    });
    return rentals;
  } catch (error) {
    console.error('Error getting rentals by user DNI:', error);
    throw new Error('Error getting rentals by user DNI');
  }
};

export const deleteRental = async (rentalId: string): Promise<void> => {
  try {
    await deleteDoc(doc(collection(db, 'Rentals'), rentalId));
  } catch (error) {
    console.error('Error deleting rental:', error);
    throw new Error('Error deleting rental');
  }
};