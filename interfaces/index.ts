import { Timestamp } from 'firebase/firestore';
export interface IUser {
    id: string;
    dni: string;
    available_minutes: number;
}

export interface IStation {
    id: string;
    name: string;
    location: string;
}

export interface IScooter {
    id: string;
    identifier: string;
    station_id: string;
    status: 'available' | 'in_use';
}

export interface IRental {
    id: string;
    user_id: string;
    scooter_id: string;
    start_time: Timestamp;
    end_time?: Timestamp;
    start_station_id: string;
    end_station_id?: string;
    duration_minutes?: number;
    status: 'active' | 'completed';
}

export interface IBonusAndPenalty {
    id: string;
    user_id: string;
    type: 'bonus' | 'penalty';
    minutes: number;
    applied_at: Timestamp;
}
