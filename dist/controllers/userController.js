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
exports.getDashBoardC = exports.updateUserByDniC = exports.getUserByDniC = exports.deleteUserC = exports.updateUserC = exports.getUsersC = exports.getUserByIdC = exports.addUserC = void 0;
const index_1 = require("../constant/index");
const userService_1 = require("../services/userService");
function addUserC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.addUser)(req.body);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ user });
        }
        catch (error) {
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.addUserC = addUserC;
function getUserByIdC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield (0, userService_1.getUserById)(userId);
            if (user) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ user });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.USER_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting user by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getUserByIdC = getUserByIdC;
function getDashBoardC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.getDashBoard)();
            if (user) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ user });
            }
            else {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.USER_NOT_FOUND });
            }
        }
        catch (error) {
            console.error('Error getting user by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getDashBoardC = getDashBoardC;
function getUserByDniC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDni = req.params.userDni;
        try {
            const user = yield (0, userService_1.getUserByDni)(userDni);
            if (user) {
                res.status(index_1.HTTP_CODES.SUCCESS).json({ user });
            }
            else {
                const newUser = yield (0, userService_1.addUser)(userDni);
                res.status(index_1.HTTP_CODES.SUCCESS).json({ error: index_1.RESPONSE_MESSAGES.USER_UPLOADED_SUCCESSFULLY });
            }
        }
        catch (error) {
            console.error('Error getting user by id:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getUserByDniC = getUserByDniC;
function getUsersC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getUsers)();
            res.status(index_1.HTTP_CODES.SUCCESS).json({ users });
        }
        catch (error) {
            console.error('Error getting users:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.getUsersC = getUsersC;
function updateUserC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        try {
            yield (0, userService_1.updateUser)(userId, updatedUserData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.USER_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateUserC = updateUserC;
function updateUserByDniC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDni = req.params.userDni;
        const updatedUserData = req.body;
        try {
            yield (0, userService_1.updateUser)(userDni, updatedUserData);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.USER_UPDATED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.updateUserByDniC = updateUserByDniC;
function deleteUserC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield (0, userService_1.getUserById)(userId);
            if (!user) {
                res.status(index_1.HTTP_CODES.NOT_FOUND).json({ error: index_1.RESPONSE_MESSAGES.USER_NOT_FOUND });
                return;
            }
            yield (0, userService_1.deleteUser)(userId);
            res.status(index_1.HTTP_CODES.SUCCESS).json({ message: index_1.RESPONSE_MESSAGES.USER_DELETED_SUCCESSFULLY });
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(index_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: index_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    });
}
exports.deleteUserC = deleteUserC;
