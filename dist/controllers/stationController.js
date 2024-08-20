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
exports.deleteStationC = exports.updateStationC = exports.getStationsC = exports.getStationByIdC = exports.addStationC = void 0;
const index_1 = require("../constant/index");
const stationService_1 = require("../services/stationService");
function addStationC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stationData = req.body.station;
            const station = yield (0, stationService_1.addStation)(stationData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ station });
        }
        catch (error) {
            console.error('Error adding station:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addStationC = addStationC;
function getStationByIdC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stationId = req.params.stationId;
        try {
            const station = yield (0, stationService_1.getStationById)(stationId);
            if (station) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ station });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.STATION_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting station by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getStationByIdC = getStationByIdC;
function getStationsC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stations = yield (0, stationService_1.getStations)();
            res.status(index_1.HTTP_CODES.SUCCESS).json({ stations });
        }
        catch (error) {
            console.error('Error getting stations:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getStationsC = getStationsC;
function updateStationC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stationId = req.params.stationId;
        const updatedStationData = req.body;
        try {
            yield (0, stationService_1.updateStation)(stationId, updatedStationData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.STATION_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating station:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateStationC = updateStationC;
function deleteStationC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stationId = req.params.stationId;
        try {
            const station = yield (0, stationService_1.getStationById)(stationId);
            if (!station) {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.STATION_NOT_FOUND });
                return;
            }
            yield (0, stationService_1.deleteStation)(stationId);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.STATION_DELETED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error deleting station:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteStationC = deleteStationC;
