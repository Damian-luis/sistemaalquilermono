"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRental = exports.getRentalsByUserDni = exports.getRentalById = exports.updateRental = exports.getRentals = exports.updateRentalForDevolution = exports.addRental = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const uuid_1 = require("uuid");
const firestore_1 = require("firebase/firestore");
const usersCollection = () => (0, firestore_1.collection)(firebaseConfig_1.db, 'Users');
const stationsCollection = () => (0, firestore_1.collection)(firebaseConfig_1.db, 'Stations');
const rentalsCollection = () => (0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals');
const addRental = (rental) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalId = (0, uuid_1.v4)();
        const newRental = Object.assign(Object.assign({}, rental), { id: rentalId });
        const userQuery = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)("dni", "==", rental.user_dni));
        const querySnapshot = yield (0, firestore_1.getDocs)(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
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
            }
            else {
                if ((userData.rentalCount || 0) % 2 === 1) {
                    userData.bonusMinutes = (userData.bonusMinutes || 0) + 30;
                }
            }
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usersCollection(), userId), {
                rentedScooterId: rental.scooter_identifier,
                available_minutes: remainingMinutes,
                bonusMinutes: userData.bonusMinutes,
                lastRentalDate: currentDate.toISOString(),
                rentalCount: (userData.rentalCount || 0) + 1,
                punishment: false
            }, { merge: true });
            const stationDoc = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(stationsCollection(), rental.start_station_id));
            if (stationDoc.exists()) {
                const stationData = stationDoc.data();
                let scooters = stationData.scooters || [];
                scooters = scooters.map((scooter) => {
                    if (scooter.identifier === rental.scooter_identifier) {
                        return Object.assign(Object.assign({}, scooter), { status: 'in_use' });
                    }
                    return scooter;
                });
                yield (0, firestore_1.setDoc)((0, firestore_1.doc)(stationsCollection(), rental.start_station_id), { scooters }, { merge: true });
            }
            else {
                throw new Error('Station not found');
            }
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'), rentalId), newRental);
            return newRental;
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        console.error('Error adding rental:', error);
        throw new Error('Error adding rental');
    }
});
exports.addRental = addRental;
const updateRentalForDevolution = (rentalData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("entra al servicio de update rental for devolution");
        console.log(rentalData);
        const { user_dni, id, scooter_identifier, station_name, station_name_devolution, usedMinutes } = rentalData;
        const returnDate = new Date().toISOString();
        const userQuery = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)("dni", "==", user_dni));
        const userSnapshot = yield (0, firestore_1.getDocs)(userQuery);
        if (!userSnapshot.empty) {
            const userId = userSnapshot.docs[0].id;
            const userData = userSnapshot.docs[0].data();
            const historicMinutesRented = (userData.historicMinutesRented || 0) + usedMinutes;
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usersCollection(), userId), {
                user_dni,
                rentedScooterId: null,
                historicMinutesRented
            }, { merge: true });
        }
        else {
            throw new Error('User not found');
        }
        const rentalRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'), id);
        yield (0, firestore_1.updateDoc)(rentalRef, { status: 'completed', returnDate });
        const stationQuery = (0, firestore_1.query)(stationsCollection(), (0, firestore_1.where)("name", "==", station_name));
        const stationSnapshot = yield (0, firestore_1.getDocs)(stationQuery);
        if (!stationSnapshot.empty) {
            const stationId = stationSnapshot.docs[0].id;
            const stationData = stationSnapshot.docs[0].data();
            const scooters = stationData.scooters || [];
            const updatedScooters = scooters.map((scooter) => {
                if (scooter.identifier === scooter_identifier) {
                    return Object.assign(Object.assign({}, scooter), { status: 'available' });
                }
                return scooter;
            });
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(stationsCollection(), stationId), { scooters: updatedScooters }, { merge: true });
            const stationQueryDevolution = (0, firestore_1.query)(stationsCollection(), (0, firestore_1.where)("name", "==", station_name_devolution));
            const stationSnapshotDevolution = yield (0, firestore_1.getDocs)(stationQueryDevolution);
            if (!stationSnapshotDevolution.empty) {
                const stationIdDevolution = stationSnapshotDevolution.docs[0].id;
                const stationDataDevolution = stationSnapshotDevolution.docs[0].data();
                const scootersDevolution = stationDataDevolution.scooters || [];
                const updatedScootersDevolution = scootersDevolution.map((scooter) => {
                    if (scooter.identifier === scooter_identifier) {
                        return Object.assign(Object.assign({}, scooter), { status: 'available' });
                    }
                    return scooter;
                });
                yield (0, firestore_1.setDoc)((0, firestore_1.doc)(stationsCollection(), stationIdDevolution), { scooters: updatedScootersDevolution }, { merge: true });
            }
            else {
                throw new Error('Devolution station not found');
            }
        }
        else {
            throw new Error('Station not found');
        }
    }
    catch (error) {
        console.error('Error updating rental for devolution:', error);
        throw new Error('Error updating rental for devolution');
    }
});
exports.updateRentalForDevolution = updateRentalForDevolution;
const getRentals = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'));
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.error('Error getting rentals:', error);
        throw new Error('Error getting rentals');
    }
});
exports.getRentals = getRentals;
const updateRental = (rentalId, updatedRental) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'), rentalId), updatedRental);
    }
    catch (error) {
        console.error('Error updating rental:', error);
        throw new Error('Error updating rental');
    }
});
exports.updateRental = updateRental;
const getRentalById = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("intenta entrar");
        console.log(rentalId);
        const docSnapshot = yield (0, firestore_1.getDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'), rentalId));
        return docSnapshot.exists() ? docSnapshot.data() : undefined;
    }
    catch (error) {
        console.log("obtuvo error");
        console.error('Error getting rental by id:', error);
        throw new Error('Error getting rental by id');
    }
});
exports.getRentalById = getRentalById;
const getRentalsByUserDni = (userDni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalsRef = (0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals');
        const q = (0, firestore_1.query)(rentalsRef, (0, firestore_1.where)('user_dni', '==', userDni));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        const rentals = [];
        let actualScooter;
        querySnapshot.forEach((doc) => {
            const rentalData = doc.data();
            rentals.push(rentalData);
            if (rentalData.status === 'active') {
                actualScooter = rentalData;
            }
        });
        return { historical: rentals, actualScooter };
    }
    catch (error) {
        console.error('Error getting rentals by user DNI:', error);
        throw new Error('Error getting rentals by user DNI');
    }
});
exports.getRentalsByUserDni = getRentalsByUserDni;
const deleteRental = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'), rentalId));
    }
    catch (error) {
        console.error('Error deleting rental:', error);
        throw new Error('Error deleting rental');
    }
});
exports.deleteRental = deleteRental;
const checkRentalsForPenalties = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("verificación de penalidades");
        const now = new Date();
        const rentalsQuery = (0, firestore_1.query)(rentalsCollection(), (0, firestore_1.where)('status', '==', 'active'));
        const rentalSnapshot = yield (0, firestore_1.getDocs)(rentalsQuery);
        for (const rentalDoc of rentalSnapshot.docs) {
            const rentalData = rentalDoc.data();
            const { user_dni, rentalDate, usedMinutes } = rentalData;
            const rentalDateTime = new Date(rentalDate);
            const diffInMinutes = (now.getTime() - rentalDateTime.getTime()) / (1000 * 60);
            if (diffInMinutes > usedMinutes) {
                const userQuery = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)('dni', '==', user_dni));
                const userSnapshot = yield (0, firestore_1.getDocs)(userQuery);
                if (!userSnapshot.empty) {
                    const userDoc = userSnapshot.docs[0];
                    const userId = userDoc.id;
                    const userData = userDoc.data();
                    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(usersCollection(), userId), { punishment: true });
                    console.log(`Usuario con DNI ${user_dni} ha sido penalizado.`);
                }
            }
        }
        const penalizedUsersQuery = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)('punishment', '==', true));
        const penalizedUsersSnapshot = yield (0, firestore_1.getDocs)(penalizedUsersQuery);
        for (const userDoc of penalizedUsersSnapshot.docs) {
            const userData = userDoc.data();
            const { lastRentalDate, dni } = userData;
            const lastRentalDateTime = new Date(lastRentalDate);
            const diffInDays = (now.getTime() - lastRentalDateTime.getTime()) / (1000 * 60 * 60 * 24);
            if (diffInDays > 7) {
                yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(usersCollection(), userDoc.id), { punishment: false });
                console.log(`Castigo para el usuario con DNI ${dni} ha sido removido.`);
            }
            //para pruebas
            /*const diffInMinutes = (now.getTime() - lastRentalDateTime.getTime()) / (1000 * 60);
    
            if (diffInMinutes > 2) {
              await updateDoc(doc(usersCollection(), userDoc.id), { punishment: false });
              console.log(`Punishment for user with DNI ${dni} has been removed.`);
            }*/
        }
    }
    catch (error) {
        console.error(error);
    }
});
// Programar la tarea para que se ejecute cada 30 minutos
//cron.schedule('*/30 * * * *', checkRentalsForPenalties);
// Programar la tarea para que se ejecute cada 2 minutos
//cron.schedule('*/2 * * * *', checkRentalsForPenalties);
//aqui se resolvera cada 30 segundos para casos de prueba
//cron.schedule('*/30 * * * * *', checkRentalsForPenalties);
//cada 1 minuto
//cron.schedule('*/1 * * * *', checkRentalsForPenalties);
