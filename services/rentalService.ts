import { db } from '../config/firebaseConfig';
import { IRental } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, CollectionReference,deleteDoc,query,where } from 'firebase/firestore';
import { IUser } from '../interfaces';
import { IScooter } from '../interfaces';
import { Timestamp } from 'firebase/firestore';
const usersCollection = () => collection(db, 'Users');
const stationsCollection = () => collection(db, 'Stations');

export const addRental = async (rental: IRental): Promise<IRental> => {
  try {
    const rentalId = uuidv4();
    const newRental = { ...rental, id: rentalId };


    const userQuery = query(usersCollection(), where("dni", "==", rental.user_dni));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as IUser;
      const userId = userDoc.id;

      const currentDate = new Date();
      const lastRentalDate = userData.lastRentalDate 
        ? typeof userData.lastRentalDate === 'string'
          ? new Date(userData.lastRentalDate).toISOString()
          : userData.lastRentalDate.toDate().toISOString()
        : new Date(0).toISOString();
      const daysSinceLastRental = (currentDate.getTime() - new Date(lastRentalDate).getTime()) / (1000 * 60 * 60 * 24);
      let availableMinutes = userData.available_minutes || 120;

      if (daysSinceLastRental >= 7) {
        availableMinutes = 120;
        userData.bonusMinutes = 0;
      }

      if (availableMinutes <= 0) {
        throw new Error('No hay tiempo de uso disponible. Debe esperar 7 días desde el último alquiler.');
      }

      const usedMinutes = rental.usedMinutes;
      const remainingMinutes = availableMinutes - usedMinutes;

      if (remainingMinutes < 0) {
        throw new Error('No tienes suficientes minutos disponibles para este alquiler.');
      }

      if (rental.isBonusBeingUsed && rental.isBonusBeingUsed === true) {
        userData.bonusMinutes = 0; 
      } else {
        if ((userData.rentalCount || 0) % 2 === 1) {
          userData.bonusMinutes = (userData.bonusMinutes || 0) + 30;
        }
      }


      await setDoc(doc(usersCollection(), userId), {
        rentedScooterId: rental.scooter_identifier,
        available_minutes: remainingMinutes,
        bonusMinutes: userData.bonusMinutes,
        lastRentalDate: currentDate.toISOString(),
        rentalCount: (userData.rentalCount || 0) + 1,
      }, { merge: true });


      const stationDoc = await getDoc(doc(stationsCollection(), rental.start_station_id));
      if (stationDoc.exists()) {
        const stationData = stationDoc.data();
        let scooters = stationData.scooters || [];


        scooters = scooters.map((scooter: IScooter) => {
          if (scooter.identifier === rental.scooter_identifier) {
            return { ...scooter, status: 'in_use' };
          }
          return scooter;
        });


        await setDoc(doc(stationsCollection(), rental.start_station_id), { scooters }, { merge: true });
      } else {
        throw new Error('Station not found');
      }

      await setDoc(doc(collection(db, 'Rentals'), rentalId), newRental);

      return newRental;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error adding rental:', error);
    throw new Error('Error adding rental');
  }
};









export const updateRentalForDevolution = async (rentalData: any): Promise<any> => {
  try {
    const { user_dni, id, scooter_identifier, station_name, station_name_devolution, usedMinutes } = rentalData;

    const returnDate = new Date().toISOString();


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
    await updateDoc(rentalRef, { status: 'completed', returnDate });


    const stationQuery = query(stationsCollection(), where("name", "==", station_name));
    const stationSnapshot = await getDocs(stationQuery);
    if (!stationSnapshot.empty) {
      const stationId = stationSnapshot.docs[0].id;
      const stationData = stationSnapshot.docs[0].data();
      const scooters = stationData.scooters || []; 


      const updatedScooters = scooters.map((scooter: any) => {
        if (scooter.identifier === scooter_identifier) {
          return { ...scooter, status: 'available' }; 
        }
        return scooter;
      });

      await setDoc(doc(stationsCollection(), stationId), { scooters: updatedScooters }, { merge: true });


      const stationQueryDevolution = query(stationsCollection(), where("name", "==", station_name_devolution));
      const stationSnapshotDevolution = await getDocs(stationQueryDevolution);
      if (!stationSnapshotDevolution.empty) {
        const stationIdDevolution = stationSnapshotDevolution.docs[0].id;
        const stationDataDevolution = stationSnapshotDevolution.docs[0].data();
        const scootersDevolution = stationDataDevolution.scooters || []; 


        const updatedScootersDevolution = [...scootersDevolution, { identifier: scooter_identifier, status: 'available' }];
        await setDoc(doc(stationsCollection(), stationIdDevolution), { scooters: updatedScootersDevolution }, { merge: true });
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