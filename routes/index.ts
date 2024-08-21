import express from "express"
const Router=express.Router()
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage });

    
import { addUserC, getUserByIdC, getUsersC, updateUserC,deleteUserC,getUserByDniC,updateUserByDniC,getDashBoardC } from "../controllers/userController";
import { addStationC, getStationByIdC, getStationsC, updateStationC, deleteStationC } from "../controllers/stationController";
import { addScooterC, getScooterByIdC, getScootersC, updateScooterC, deleteScooterC } from "../controllers/scooterController";
import { addRentalC, getRentalByIdC, getRentalsC, updateRentalC, deleteRentalC, getRentalByDniC,makeDevolutionC } from "../controllers/rentalController";
import { addBonusOrPenaltyC, getBonusOrPenaltyByIdC, getBonusesAndPenaltiesC, updateBonusOrPenaltyC, deleteBonusOrPenaltyC } from "../controllers/bonusAndPenaltyController";
import { get } from "http";

//Rutas de usuario
Router.post('/addUser', addUserC);
//Router.get('/user/:userId', getUserByIdC);
Router.get('/users', getUsersC);
//Router.put('/updateUser/:userId', updateUserC);
Router.delete('/deleteUser/:userId', deleteUserC);
Router.get('/user/:userDni', getUserByDniC);
Router.put('/updateUser/:userDni', updateUserByDniC);

// Rutas de estaciones
Router.post('/stations/add', addStationC);
Router.get('/stations/:stationId', getStationByIdC);
Router.get('/stations', getStationsC);
Router.put('/stations/update/:stationId', updateStationC);
Router.delete('/stations/delete/:stationId', deleteStationC);

// Rutas de scooters
Router.post('/scooters/add', addScooterC);
Router.get('/scooters/:scooterId', getScooterByIdC);
Router.get('/scooters', getScootersC);
Router.put('/scooters/update/:scooterId', updateScooterC);
Router.delete('/scooters/delete/:scooterId', deleteScooterC);

// Rutas de alquiler
Router.post('/rentals/add', addRentalC);
Router.get('/rentals/:userId', getRentalByIdC);
Router.get('/rentals/dni/:userDni', getRentalByDniC);
Router.get('/rentals', getRentalsC);
Router.put('/rentals/update/:rentalId', updateRentalC);
Router.delete('/rentals/delete/:rentalId', deleteRentalC);
Router.put('/rentals/makeDevolution', makeDevolutionC);

// Rutas de bonus y multas
Router.post('/bonuses-and-penalties/add', addBonusOrPenaltyC);
Router.get('/bonuses-and-penalties/:bpId', getBonusOrPenaltyByIdC);
Router.get('/bonuses-and-penalties', getBonusesAndPenaltiesC);
Router.put('/bonuses-and-penalties/update/:bpId', updateBonusOrPenaltyC);
Router.delete('/bonuses-and-penalties/delete/:bpId', deleteBonusOrPenaltyC);

//dashboard

Router.get('/dashboard', getDashBoardC);

Router.get('/test', (req, res) => {
    res.send('Hello World!');
  });
export default Router