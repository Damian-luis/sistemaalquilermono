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
exports.deleteScooter = exports.getScooterById = exports.updateScooter = exports.getScooters = exports.addScooter = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const uuid_1 = require("uuid");
const firestore_1 = require("firebase/firestore");
const addScooter = (scooter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scooterId = (0, uuid_1.v4)();
        const newScooter = Object.assign(Object.assign({}, scooter), { id: scooterId });
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Scooters'), scooterId), newScooter);
        return newScooter;
    }
    catch (error) {
        console.error('Error adding scooter:', error);
        throw new Error('Error adding scooter');
    }
});
exports.addScooter = addScooter;
const getScooters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConfig_1.db, 'Scooters'));
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.error('Error getting scooters:', error);
        throw new Error('Error getting scooters');
    }
});
exports.getScooters = getScooters;
const updateScooter = (scooterId, updatedScooter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Scooters'), scooterId), updatedScooter);
    }
    catch (error) {
        console.error('Error updating scooter:', error);
        throw new Error('Error updating scooter');
    }
});
exports.updateScooter = updateScooter;
const getScooterById = (scooterId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnapshot = yield (0, firestore_1.getDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Scooters'), scooterId));
        return docSnapshot.exists() ? docSnapshot.data() : undefined;
    }
    catch (error) {
        console.error('Error getting scooter by id:', error);
        throw new Error('Error getting scooter by id');
    }
});
exports.getScooterById = getScooterById;
const deleteScooter = (scooterId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Scooters'), scooterId));
    }
    catch (error) {
        console.error('Error deleting scooter:', error);
        throw new Error('Error deleting scooter');
    }
});
exports.deleteScooter = deleteScooter;
