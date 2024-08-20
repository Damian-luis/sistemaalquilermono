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
exports.deleteUser = exports.updateUserByDni = exports.getUserByDni = exports.getUserById = exports.updateUser = exports.getUsers = exports.getDashBoard = exports.addUser = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const uuid_1 = require("uuid");
const firestore_1 = require("firebase/firestore");
const date_fns_1 = require("date-fns");
const usersCollection = () => (0, firestore_1.collection)(firebaseConfig_1.db, 'Users');
const addUser = (userDni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, uuid_1.v4)();
        const cleanUserData = {
            id: userId,
            dni: userDni,
            available_minutes: 120,
            historicMinutesRented: 0,
            rentedScooterId: null,
            bonusMinutes: 0,
            punishment: false,
            rentalCount: 0
        };
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usersCollection(), userId), cleanUserData);
        return cleanUserData;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error adding user');
    }
});
exports.addUser = addUser;
const getDashBoard = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalsSnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConfig_1.db, 'Rentals'));
        const rentals = [];
        rentalsSnapshot.forEach((doc) => {
            const data = doc.data();
            const usedMinutes = data.usedMinutes || 0;
            rentals.push(Object.assign(Object.assign({}, data), { usedMinutes }));
        });
        const usersSnapshot = yield (0, firestore_1.getDocs)(usersCollection());
        const users = [];
        usersSnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        let totalRentedMinutes = 0;
        rentals.forEach((rental) => {
            totalRentedMinutes += rental.usedMinutes || 0;
        });
        const rentalsPerDayMap = {
            'Monday': 0,
            'Tuesday': 0,
            'Wednesday': 0,
            'Thursday': 0,
            'Friday': 0,
            'Saturday': 0,
            'Sunday': 0,
        };
        rentals.forEach((rental) => {
            const rentalDate = rental.rentalDate;
            if (rentalDate) {
                const dayOfWeek = (0, date_fns_1.format)(new Date(rentalDate), 'EEEE');
                if (dayOfWeek && rentalsPerDayMap.hasOwnProperty(dayOfWeek)) {
                    rentalsPerDayMap[dayOfWeek]++;
                }
            }
        });
        const rentalsPerDay = Object.keys(rentalsPerDayMap).map(dayOfWeek => ({
            dayOfWeek,
            rentalsCount: rentalsPerDayMap[dayOfWeek]
        }));
        const daysWithRentals = rentalsPerDay.filter(day => day.rentalsCount > 0);
        const averageRentalsPerDay = daysWithRentals.length > 0 ? rentals.length / daysWithRentals.length : 0;
        return { rentals, users, totalRentedMinutes, rentalsPerDay, averageRentalsPerDay };
    }
    catch (error) {
        console.error('Error getting dashboard data:', error);
        throw new Error('Error getting dashboard data');
    }
});
exports.getDashBoard = getDashBoard;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)(usersCollection());
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    }
    catch (error) {
        console.error('Error getting users:', error);
        throw new Error('Error getting users');
    }
});
exports.getUsers = getUsers;
const updateUser = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usersCollection(), userId), updatedUser, { merge: true });
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
});
exports.updateUser = updateUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(usersCollection(), userId));
        if (docSnap.exists()) {
            return docSnap.data();
        }
        else {
            return undefined;
        }
    }
    catch (error) {
        console.error('Error getting user by id:', error);
        throw new Error('Error getting user by id');
    }
});
exports.getUserById = getUserById;
const getUserByDni = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)("dni", "==", dni));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            return docSnap.data();
        }
        else {
            return undefined;
        }
    }
    catch (error) {
        console.error('Error getting user by DNI:', error);
        throw new Error('Error getting user by DNI');
    }
});
exports.getUserByDni = getUserByDni;
const updateUserByDni = (dni, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = (0, firestore_1.query)(usersCollection(), (0, firestore_1.where)("dni", "==", dni));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (!querySnapshot.empty) {
            const userId = querySnapshot.docs[0].id;
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(usersCollection(), userId), updatedUser, { merge: true });
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        console.error('Error updating user by DNI:', error);
        throw new Error('Error updating user by DNI');
    }
});
exports.updateUserByDni = updateUserByDni;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(usersCollection(), userId));
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
});
exports.deleteUser = deleteUser;
