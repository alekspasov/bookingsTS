import { useEffect, useState } from "react";
import "./App.css";
import { getAllAirports } from "./services/bookings.service.ts";
import AppState from "./context/AppState.tsx";
import Bookings from "./components/Bookings/Bookings.tsx";
import BookingForm from "./components/BookingForm/BookingsForm.tsx";
import Loader from "./components/Loader/Loader.tsx";
import GoUpButton from "./components/GoUpButton/GoUpButton.tsx";
import { AirportType } from "./common/types.ts";

type AirportsArr = AirportType[];

function App() {
  const [airports, setAirports] = useState<AirportsArr>([]);

  const [showBookings, setShowBookings] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllAirports().then((result) => {
      setAirports([...result])
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AppState.Provider
        value={{
          airports: airports,
          setAirports: setAirports,
          showBookings: showBookings,
          setShowBookings: setShowBookings,
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div id="app">
            <BookingForm />
            <Bookings />
            <GoUpButton />
          </div>
        )}
      </AppState.Provider>
    </>
  );
}

export default App;
