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
exports.deleteStation = exports.getStationById = exports.updateStation = exports.getStations = exports.addStation = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const uuid_1 = require("uuid");
const firestore_1 = require("firebase/firestore");
const addStation = (station) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stationId = (0, uuid_1.v4)();
        const newStation = Object.assign(Object.assign({}, station), { id: stationId, scooters: [] });
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Stations'), stationId), newStation);
        return newStation;
    }
    catch (error) {
        console.error('Error adding station:', error);
        throw new Error('Error adding station');
    }
});
exports.addStation = addStation;
const getStations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConfig_1.db, 'Stations'));
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.error('Error getting stations:', error);
        throw new Error('Error getting stations');
    }
});
exports.getStations = getStations;
const updateStation = (stationId, newScooter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Stations'), stationId), {
            scooters: (0, firestore_1.arrayUnion)(newScooter.scooter)
        });
    }
    catch (error) {
        console.error('Error updating station:', error);
        throw new Error('Error updating station');
    }
});
exports.updateStation = updateStation;
const getStationById = (stationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnapshot = yield (0, firestore_1.getDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Stations'), stationId));
        return docSnapshot.exists() ? docSnapshot.data() : undefined;
    }
    catch (error) {
        console.error('Error getting station by id:', error);
        throw new Error('Error getting station by id');
    }
});
exports.getStationById = getStationById;
const deleteStation = (stationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'Stations'), stationId));
    }
    catch (error) {
        console.error('Error deleting station:', error);
        throw new Error('Error deleting station');
    }
});
exports.deleteStation = deleteStation;
