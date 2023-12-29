import { AirportType, BookingType } from "./../common/types";
import { API_KEY, BASE_URL } from "../common/constants";

export const getAllAirports = async (): Promise<AirportType[]> => {
  try {
    const airports = await fetch(`${BASE_URL}/airports?authToken=${API_KEY}`);
    return airports.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAirportById = async (id: number): Promise<AirportType> => {
  try {
    const airportsArr: AirportType[] = await getAllAirports();
    const airport = airportsArr.find((airport) => airport.id === id);
    if (airport) {
      return airport;
    }
    return {};
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const getAllBookings = async (
  index: number = 0
): Promise<BookingType[]> => {
  try {
    const bookings = await fetch(
      `${BASE_URL}/bookings?pageIndex=${index}&pageSize=5&authToken=${API_KEY}`
    );
    const data = await bookings.json();
    return data.list;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const createNewBooking = async (
  booking: BookingType
): Promise<BookingType> => {
  try {
    const newBooking = await fetch(
      `${BASE_URL}/bookings/create?authToken=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      }
    );
    return newBooking.json();
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const deleteBooking = async (bookingId: number) => {
  try {
    await fetch(
      `${BASE_URL}/bookings/delete/${bookingId}?authToken=${API_KEY}`,
      { method: "DELETE" }
    );

  } catch (e) {
    console.log(e);
  }
};
