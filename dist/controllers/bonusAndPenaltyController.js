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
exports.deleteBonusOrPenaltyC = exports.updateBonusOrPenaltyC = exports.getBonusesAndPenaltiesC = exports.getBonusOrPenaltyByIdC = exports.addBonusOrPenaltyC = void 0;
const index_1 = require("../constant/index");
const bonusAndPenaltyService_1 = require("../services/bonusAndPenaltyService");
function addBonusOrPenaltyC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bpData = req.body;
            const bp = yield (0, bonusAndPenaltyService_1.addBonusOrPenalty)(bpData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ bp });
        }
        catch (error) {
            console.error('Error adding bonus or penalty:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addBonusOrPenaltyC = addBonusOrPenaltyC;
function getBonusOrPenaltyByIdC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bpId = req.params.bpId;
        try {
            const bp = yield (0, bonusAndPenaltyService_1.getBonusOrPenaltyById)(bpId);
            if (bp) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ bp });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.BONUS_OR_PENALTY_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting bonus or penalty by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getBonusOrPenaltyByIdC = getBonusOrPenaltyByIdC;
function getBonusesAndPenaltiesC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bonusesAndPenalties = yield (0, bonusAndPenaltyService_1.getBonusesAndPenalties)();
            res.status(index_1.HTTP_CODES.SUCCESS).json({ bonusesAndPenalties });
        }
        catch (error) {
            console.error('Error getting bonuses and penalties:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getBonusesAndPenaltiesC = getBonusesAndPenaltiesC;
function updateBonusOrPenaltyC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bpId = req.params.bpId;
        const updatedBPData = req.body;
        try {
            yield (0, bonusAndPenaltyService_1.updateBonusOrPenalty)(bpId, updatedBPData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.BONUS_OR_PENALTY_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating bonus or penalty:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateBonusOrPenaltyC = updateBonusOrPenaltyC;
function deleteBonusOrPenaltyC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bpId = req.params.bpId;
        try {
            const bp = yield (0, bonusAndPenaltyService_1.getBonusOrPenaltyById)(bpId);
            if (!bp) {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.BONUS_OR_PENALTY_NOT_FOUND });
                return;
            }
            yield (0, bonusAndPenaltyService_1.deleteBonusOrPenalty)(bpId);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.BONUS_OR_PENALTY_DELETED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error deleting bonus or penalty:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteBonusOrPenaltyC = deleteBonusOrPenaltyC;
