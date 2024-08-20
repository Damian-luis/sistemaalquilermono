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
exports.deleteBonusOrPenalty = exports.getBonusOrPenaltyById = exports.updateBonusOrPenalty = exports.getBonusesAndPenalties = exports.addBonusOrPenalty = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const uuid_1 = require("uuid");
const firestore_1 = require("firebase/firestore");
const addBonusOrPenalty = (bp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bpId = (0, uuid_1.v4)();
        const newBP = Object.assign(Object.assign({}, bp), { id: bpId });
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'BonusesAndPenalties'), bpId), newBP);
        return newBP;
    }
    catch (error) {
        console.error('Error adding bonus or penalty:', error);
        throw new Error('Error adding bonus or penalty');
    }
});
exports.addBonusOrPenalty = addBonusOrPenalty;
const getBonusesAndPenalties = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebaseConfig_1.db, 'BonusesAndPenalties'));
        return querySnapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.error('Error getting bonuses and penalties:', error);
        throw new Error('Error getting bonuses and penalties');
    }
});
exports.getBonusesAndPenalties = getBonusesAndPenalties;
const updateBonusOrPenalty = (bpId, updatedBP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'BonusesAndPenalties'), bpId), updatedBP);
    }
    catch (error) {
        console.error('Error updating bonus or penalty:', error);
        throw new Error('Error updating bonus or penalty');
    }
});
exports.updateBonusOrPenalty = updateBonusOrPenalty;
const getBonusOrPenaltyById = (bpId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnapshot = yield (0, firestore_1.getDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'BonusesAndPenalties'), bpId));
        return docSnapshot.exists() ? docSnapshot.data() : undefined;
    }
    catch (error) {
        console.error('Error getting bonus or penalty by id:', error);
        throw new Error('Error getting bonus or penalty by id');
    }
});
exports.getBonusOrPenaltyById = getBonusOrPenaltyById;
const deleteBonusOrPenalty = (bpId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)((0, firestore_1.collection)(firebaseConfig_1.db, 'BonusesAndPenalties'), bpId));
    }
    catch (error) {
        console.error('Error deleting bonus or penalty:', error);
        throw new Error('Error deleting bonus or penalty');
    }
});
exports.deleteBonusOrPenalty = deleteBonusOrPenalty;
