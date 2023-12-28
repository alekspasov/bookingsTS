export type BookingType = {
    firstName?: string;
    lastName?: string;
    departureAirportId?: number;
    arrivalAirportId?: number;
    departureDate?: string;
    returnDate?: string;
    id?: number;

}

export type AirportType = {
    id?: number;
    code?: string;
    title?: string;
}