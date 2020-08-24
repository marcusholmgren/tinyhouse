import {ObjectId, Collection} from 'mongodb';

export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE",
}

interface BookingsIndexMonth {
    [key: string]: boolean;
}

interface BookingsIndexYear {
    [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
    [key: string]: BookingsIndexYear;
}

export interface Booking {
    _id: ObjectId;
    listing: ObjectId;
    tenant: string;
    checkIn: string;
    checkOut: string;
}

export interface Listing {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    host: string;
    type: ListingType;
    address: string;
    country: string;
    admin: string;
    city: string;
    bookings: ObjectId[];
    bookingsIndex: BookingsIndex;
    price: number;
    numOfGuests: number;
}

export interface User {
    _id: string;
    token: string;
    name: string;
    avatar: string;
    contact: string;
    walletId?: string;
    income: number;
    bookings: ObjectId[];
    listings: ObjectId[];
}

export interface Database {
    bookings: Collection<Booking>;
    listings: Collection<Listing>;
    users: Collection<User>;
}
