"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_MESSAGES = exports.HTTP_CODES = void 0;
exports.HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
};
exports.RESPONSE_MESSAGES = {
    USER_UPLOADED_SUCCESSFULLY: 'Usuario agregado exitosamente',
    USER_UPDATED_SUCCESSFULLY: 'Usuario agregado exitosamente',
    USER_DELETED_SUCCESSFULLY: 'Usuario eliminado exitosamente',
    USER_NOT_FOUND: 'No se ha encontrado un usuario',
    INVALID_REQUEST: 'Invalid request',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    STATION_NOT_FOUND: 'Estación no encontrada',
    STATION_UPDATED_SUCCESSFULLY: 'Estación actualizada exitosamente',
    STATION_DELETED_SUCCESSFULLY: 'Estación eliminada exitosamente',
    SCOOTER_NOT_FOUND: 'Scooter no encontrado',
    SCOOTER_UPDATED_SUCCESSFULLY: 'Scooter actualizado exitosamente',
    SCOOTER_DELETED_SUCCESSFULLY: 'Scooter eliminado exitosamente',
    RENTAL_NOT_FOUND: 'Alquiler/es no encontrado/s',
    RENTAL_UPDATED_SUCCESSFULLY: 'Alquiler actualizado exitosamente',
    RENTAL_DELETED_SUCCESSFULLY: 'Alquiler eliminado exitosamente',
    BONUS_OR_PENALTY_NOT_FOUND: 'Bonus o multa no encontrada',
    BONUS_OR_PENALTY_UPDATED_SUCCESSFULLY: 'Bonus o multa actualizada exitosamente',
    BONUS_OR_PENALTY_DELETED_SUCCESSFULLY: 'Bonus o multa eliminado exitosamente'
};
