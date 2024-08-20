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
exports.makeDevolutionC = exports.getRentalByDniC = exports.deleteRentalC = exports.updateRentalC = exports.getRentalsC = exports.getRentalByIdC = exports.addRentalC = void 0;
const index_1 = require("../constant/index");
const rentalService_1 = require("../services/rentalService");
function addRentalC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rentalData = req.body.rental;
            const rental = yield (0, rentalService_1.addRental)(rentalData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ rental });
        }
        catch (error) {
            console.error('Error adding rental:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addRentalC = addRentalC;
function getRentalByIdC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDni = req.params.userId;
        try {
            const rental = yield (0, rentalService_1.getRentalById)(userDni);
            if (rental) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ rental });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting rental by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getRentalByIdC = getRentalByIdC;
function makeDevolutionC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const renta = req.body.devolution;
        try {
            const rental = yield (0, rentalService_1.updateRentalForDevolution)(renta);
            if (rental) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ rental });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting rental by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.makeDevolutionC = makeDevolutionC;
function getRentalByDniC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDni = req.params.userDni;
        try {
            const rental = yield (0, rentalService_1.getRentalsByUserDni)(userDni);
            if (rental) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ rental });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting rental by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getRentalByDniC = getRentalByDniC;
function getRentalsC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rentals = yield (0, rentalService_1.getRentals)();
            res.status(index_1.HTTP_CODES.SUCCESS).json({ rentals });
        }
        catch (error) {
            console.error('Error getting rentals:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getRentalsC = getRentalsC;
function updateRentalC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentalId = req.params.rentalId;
        const updatedRentalData = req.body;
        try {
            yield (0, rentalService_1.updateRental)(rentalId, updatedRentalData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.RENTAL_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating rental:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateRentalC = updateRentalC;
function deleteRentalC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rentalId = req.params.rentalId;
        try {
            const rental = yield (0, rentalService_1.getRentalById)(rentalId);
            if (!rental) {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.RENTAL_NOT_FOUND });
                return;
            }
            yield (0, rentalService_1.deleteRental)(rentalId);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.RENTAL_DELETED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error deleting rental:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteRentalC = deleteRentalC;
