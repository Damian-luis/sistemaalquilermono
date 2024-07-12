import { Timestamp } from 'firebase/firestore';

export interface IUser {
    id: string;
    dni: string;
    available_minutes: number;
    rentedScooterId?: string | null;
    rentedScooterRentalId?: string | null;
    bonusMinutes?: number;
    punishment?: boolean;
    historicMinutesRented: number;
    lastRentalDate?: Timestamp;
    rentalCount?: number;
}

export interface IStation {
    id: string;
    name: string;
    location: string;
    scooters?: IScooter[];
}

export interface IScooter {
    id: string;
    identifier: string;
    station_id?: string;
    status: 'available' | 'in_use';
}

export interface IRental {
    id: string;
    user_dni: string;
    scooter_id: string;
    rentalDate: Date;
    returnDate?: Date;
    start_station_id: string;
    end_station_id?: string;
    usedMinutes: number;
    station_name: string;
    status: 'active' | 'completed';
    location_rental: string;
    scooter_identifier: string;
    isBonusBeingUsed?:true|false
}

export interface IBonusAndPenalty {
    id: string;
    user_id: string;
    type: 'bonus' | 'penalty';
    minutes: number;
    applied_at: Timestamp;
}
