import { useContext, useEffect, useState } from "react";
import AppState from "../../context/AppState";
import { deleteBooking } from "../../services/bookings.service";
import "./Booking.css";
import Loader from "../Loader/Loader";
import AlertModal from "../AlertModal/AlertModal";
import { dateFormat } from "../../common/helpers";
import { BookingType } from "../../common/types";

interface BookingInterface {
  booking: BookingType;
  setIndex?: (index: number) => void;
}

const Booking = ({ booking, setIndex }: BookingInterface) => {
  const { airports, setShowBookings } = useContext(AppState);
  const [departureAirport, setDepartureAirport] = useState(
    airports?.find((airport) => airport.id === booking.departureAirportId)
  );
  const [arrivalAirport, setArrivalAirport] = useState(
    airports?.find((airport) => airport.id === booking.arrivalAirportId)
  );
  const [remove, setRemove] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    if (remove) {
      deleteBooking(booking.id as number).then(() => {
        setRemove(!remove);
        setShowBookings(true);
        setIndex && setIndex(1);
      });
    }
  }, [remove]);

  const handleRemove = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (booking && booking.departureDate && booking.returnDate) {
      setDepartureDate(dateFormat(booking.departureDate));
      setReturnDate(dateFormat(booking.returnDate));
      setDepartureAirport(airports?.find((airport) => airport.id === booking.departureAirportId));
      setArrivalAirport(airports?.find((airport) => airport.id === booking.arrivalAirportId))
    }
  }, [booking]);

  return (
    <>
      {!booking ? 
      
      <Loader />
      
      :
      (
        <>
          <div className="booking">
            <div className="booking-header">
              <span className="airport-code">{departureAirport?.code}</span>
              <span className="arrow">→</span>
              <span className="airport-code">{arrivalAirport?.code}</span>
            </div>
            <div className="booking-info">
              <p>
                <b>Passenger:</b> {booking.firstName?.toUpperCase()}{" "}
                {booking.lastName?.toUpperCase()}
              </p>

              <p>
                <b>From:</b> {departureAirport?.title}
              </p>
              <p>
                <b>To:</b> {arrivalAirport?.title}
              </p>

              <div className="dates">
                <p>
                  <b>Departs on:</b> {departureDate}
                </p>
                <p>
                  <b>Returns on:</b> {returnDate}
                </p>
              </div>
              <button className="delete-booking" onClick={handleRemove}>
                Delete
              </button>
            </div>
          </div>
          {showModal && (
            <AlertModal
              setShowModal={setShowModal}
              showModal={showModal}
              remove={remove}
              setRemove={setRemove}
              displayText="Are you sure you want to delete this booking?"
            />
          )}
        </>
      )}
    </>
  );
};

export default Booking;
