"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage
});
const userController_1 = require("../controllers/userController");
const stationController_1 = require("../controllers/stationController");
const scooterController_1 = require("../controllers/scooterController");
const rentalController_1 = require("../controllers/rentalController");
const bonusAndPenaltyController_1 = require("../controllers/bonusAndPenaltyController");
//Rutas de usuario
Router.post('/addUser', userController_1.addUserC);
//Router.get('/user/:userId', getUserByIdC);
Router.get('/users', userController_1.getUsersC);
//Router.put('/updateUser/:userId', updateUserC);
Router.delete('/deleteUser/:userId', userController_1.deleteUserC);
Router.get('/user/:userDni', userController_1.getUserByDniC);
Router.put('/updateUser/:userDni', userController_1.updateUserByDniC);
// Rutas de estaciones
Router.post('/stations/add', stationController_1.addStationC);
Router.get('/stations/:stationId', stationController_1.getStationByIdC);
Router.get('/stations', stationController_1.getStationsC);
Router.put('/stations/update/:stationId', stationController_1.updateStationC);
Router.delete('/stations/delete/:stationId', stationController_1.deleteStationC);
// Rutas de scooters
Router.post('/scooters/add', scooterController_1.addScooterC);
Router.get('/scooters/:scooterId', scooterController_1.getScooterByIdC);
Router.get('/scooters', scooterController_1.getScootersC);
Router.put('/scooters/update/:scooterId', scooterController_1.updateScooterC);
Router.delete('/scooters/delete/:scooterId', scooterController_1.deleteScooterC);
// Rutas de alquiler
Router.post('/rentals/add', rentalController_1.addRentalC);
Router.get('/rentals/:userId', rentalController_1.getRentalByIdC);
Router.get('/rentals/dni/:userDni', rentalController_1.getRentalByDniC);
Router.get('/rentals', rentalController_1.getRentalsC);
Router.put('/rentals/update/:rentalId', rentalController_1.updateRentalC);
Router.delete('/rentals/delete/:rentalId', rentalController_1.deleteRentalC);
Router.put('/rentals/makeDevolution', rentalController_1.makeDevolutionC);
// Rutas de bonus y multas
Router.post('/bonuses-and-penalties/add', bonusAndPenaltyController_1.addBonusOrPenaltyC);
Router.get('/bonuses-and-penalties/:bpId', bonusAndPenaltyController_1.getBonusOrPenaltyByIdC);
Router.get('/bonuses-and-penalties', bonusAndPenaltyController_1.getBonusesAndPenaltiesC);
Router.put('/bonuses-and-penalties/update/:bpId', bonusAndPenaltyController_1.updateBonusOrPenaltyC);
Router.delete('/bonuses-and-penalties/delete/:bpId', bonusAndPenaltyController_1.deleteBonusOrPenaltyC);
//dashboard
Router.get('/dashboard', userController_1.getDashBoardC);
exports.default = Router;
