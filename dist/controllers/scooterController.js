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
exports.deleteScooterC = exports.updateScooterC = exports.getScootersC = exports.getScooterByIdC = exports.addScooterC = void 0;
const index_1 = require("../constant/index");
const scooterService_1 = require("../services/scooterService");
function addScooterC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scooterData = req.body;
            const scooter = yield (0, scooterService_1.addScooter)(scooterData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ scooter });
        }
        catch (error) {
            console.error('Error adding scooter:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addScooterC = addScooterC;
function getScooterByIdC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const scooterId = req.params.scooterId;
        try {
            const scooter = yield (0, scooterService_1.getScooterById)(scooterId);
            if (scooter) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ scooter });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.SCOOTER_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting scooter by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getScooterByIdC = getScooterByIdC;
function getScootersC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scooters = yield (0, scooterService_1.getScooters)();
            res.status(index_1.HTTP_CODES.SUCCESS).json({ scooters });
        }
        catch (error) {
            console.error('Error getting scooters:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getScootersC = getScootersC;
function updateScooterC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const scooterId = req.params.scooterId;
        const updatedScooterData = req.body;
        try {
            yield (0, scooterService_1.updateScooter)(scooterId, updatedScooterData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.SCOOTER_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating scooter:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateScooterC = updateScooterC;
function deleteScooterC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const scooterId = req.params.scooterId;
        try {
            const scooter = yield (0, scooterService_1.getScooterById)(scooterId);
            if (!scooter) {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.SCOOTER_NOT_FOUND });
                return;
            }
            yield (0, scooterService_1.deleteScooter)(scooterId);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.SCOOTER_DELETED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error deleting scooter:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteScooterC = deleteScooterC;
