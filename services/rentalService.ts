import { db } from '../config/firebaseConfig';
import { IRental } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, CollectionReference,deleteDoc,query,where } from 'firebase/firestore';
const usersCollection = () => collection(db, 'Users');
const stationsCollection = () => collection(db, 'Stations');

export const addRental = async (rental: IRental): Promise<IRental> => {
  try {
    const rentalId = uuidv4();
    const newRental = { ...rental, id: rentalId };
    await setDoc(doc(collection(db, 'Rentals'), rentalId), newRental);

    const userQuery = query(usersCollection(), where("dni", "==", rental.user_dni));
    const querySnapshot = await getDocs(userQuery);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      await setDoc(doc(usersCollection(), userId), { rentedScooterId: rental.scooter_identifier }, { merge: true });
    } else {
      throw new Error('User not found');
    }

    const stationDoc = await getDoc(doc(stationsCollection(), rental.start_station_id));
    if (stationDoc.exists()) {
      const stationData = stationDoc.data();
      const scooters = stationData.scooter; 

      const updatedScooters = scooters.map((scooter: any) => {
        if (scooter.identifier === rental.scooter_identifier) {
          return { ...scooter, status: 'in_use' };
        }
        return scooter;
      });

      await setDoc(doc(stationsCollection(), rental.start_station_id), { scooter: updatedScooters }, { merge: true });
    } else {
      throw new Error('Station not found');
    }

    return newRental;
  } catch (error) {
    console.error('Error adding rental:', error);
    throw new Error('Error adding rental');
  }
};

export const updateRentalForDevolution = async (rentalData: any): Promise<any> => {
  try {
    const { user_dni, id, scooter_identifier, station_name, station_name_devolution, usedMinutes } = rentalData;

    const userQuery = query(usersCollection(), where("dni", "==", user_dni));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userId = userSnapshot.docs[0].id;
      const userData = userSnapshot.docs[0].data();

      const historicMinutesRented = (userData.historicMinutesRented || 0) + usedMinutes;

      await setDoc(doc(usersCollection(), userId), { 
        user_dni,
        rentedScooterId: null, 
        historicMinutesRented 
      }, { merge: true });
    } else {
      throw new Error('User not found');
    }


    const rentalRef = doc(collection(db, 'Rentals'), id);
    await updateDoc(rentalRef, { status: 'completed' });


    const stationQuery = query(stationsCollection(), where("name", "==", station_name));
    const stationSnapshot = await getDocs(stationQuery);
    if (!stationSnapshot.empty) {
      const stationId = stationSnapshot.docs[0].id;
      const stationData = stationSnapshot.docs[0].data();
      const scooters = stationData.scooter;

      const updatedScooters = scooters.filter((scooter: any) => scooter.identifier !== scooter_identifier);


      await setDoc(doc(stationsCollection(), stationId), { scooter: updatedScooters }, { merge: true });


      const stationQueryDevolution = query(stationsCollection(), where("name", "==", station_name_devolution));
      const stationSnapshotDevolution = await getDocs(stationQueryDevolution);
      if (!stationSnapshotDevolution.empty) {
        const stationIdDevolution = stationSnapshotDevolution.docs[0].id;
        const stationDataDevolution = stationSnapshotDevolution.docs[0].data();
        const scootersDevolution = stationDataDevolution.scooter;

        const updatedScootersDevolution = [...scootersDevolution, { identifier: scooter_identifier, status: 'available' }];
        await setDoc(doc(stationsCollection(), stationIdDevolution), { scooter: updatedScootersDevolution }, { merge: true });
      } else {
        throw new Error('Devolution station not found');
      }
    } else {
      throw new Error('Station not found');
    }

  } catch (error) {
    console.error('Error updating rental for devolution:', error);
    throw new Error('Error updating rental for devolution');
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

export const getRentalsByUserDni = async (userDni: string): Promise<{ historical: IRental[], actualScooter?: IRental }> => {
  try {
    const rentalsRef = collection(db, 'Rentals');
    const q = query(rentalsRef, where('user_dni', '==', userDni));
    const querySnapshot = await getDocs(q);

    const rentals: IRental[] = [];
    let actualScooter: IRental | undefined;

    querySnapshot.forEach((doc) => {
      const rentalData = doc.data() as IRental;
      rentals.push(rentalData);
      if (rentalData.status === 'active') {
        actualScooter = rentalData;
      }
    });

    return { historical: rentals, actualScooter };
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