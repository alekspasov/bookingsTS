import { useState } from "react";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../common/constants";
import SearchAirport from "../SearchAirport/SearchAirport";
import AlertModal from "../AlertModal/AlertModal";
import "./BookingForm.css";
import Booking from "../Booking/Booking";
import { BookingType } from "../../common/types";

const BookingForm = () => {
  const [booking, setBooking] = useState<BookingType>({});
  const [showModal, setShowModal] = useState(false);
  const [clearAirport, setClearAirport] = useState(false);
  const [latestBooking, setLatestBooking] = useState<BookingType>({});
  const [showBooking, setShowBooking] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (booking && booking.firstName && booking.lastName) {
      if (
        booking.firstName.length < MIN_NAME_LENGTH ||
        booking.firstName.length > MAX_NAME_LENGTH
      ) {
        alert("First name must be between 2 and 20 characters");
        throw new Error("Invalid first name length");
      }
      if (
        booking.lastName.length < MIN_NAME_LENGTH ||
        booking.lastName.length > MAX_NAME_LENGTH
      ) {
        alert("Last name must be between 2 and 20 characters");
        throw new Error("Invalid last name length");
      }
    }
    if (!booking.departureAirportId || !booking.arrivalAirportId) {
      alert("Choose an airport from the list");
      throw new Error("Invalid airport");
    }
    if (booking.departureAirportId === booking.arrivalAirportId) {
      alert("Arrival airport must be different from departure airport");
      throw new Error("Can't choose same airport for departure and arrival");
    }
    setShowModal(!showModal);
    (e.target as HTMLFormElement).reset();
    setClearAirport(!clearAirport);
  };

  return (
    <>
      <h2>Create New Booking</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="passengers-info">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name: </span>
            </label>
            <input
              type="text"
              placeholder="First name"
              className="input-firstName"
              required
              onChange={(e) =>
                setBooking({ ...booking, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name: </span>
            </label>
            <input
              type="text"
              placeholder="Last name"
              className="input-lastName"
              required
              onChange={(e) =>
                setBooking({ ...booking, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="airports-info">
          <div className="departure-airport">
            <label className="label">
              <span className="label-text">Departure airport: </span>
            </label>
            <SearchAirport
              setBooking={setBooking}
              booking={booking}
              clearAirport={clearAirport}
              setClearAirport={setClearAirport}
            />
          </div>
          <div className="arrival-airport">
            <label className="label">
              <span className="label-text">Arrival airport: </span>
            </label>
            <SearchAirport
              setBooking={setBooking}
              booking={booking}
              clearAirport={clearAirport}
              setClearAirport={setClearAirport}
            />
          </div>
        </div>
        <div className="date-info">
          <div className="departure-date">
            <label className="label">
              <span className="label-text">Departure date: </span>
            </label>
            <input
              onKeyDown={(e) => e.preventDefault()}
              required
              type="date"
              placeholder="Click to choose departure date"
              className="input-date"
              min={new Date().toISOString().split("T")[0]}
              max={booking?.returnDate}
              onChange={(e) =>
                setBooking({ ...booking, departureDate: e.target.value })
              }
            />
          </div>
          <div className="return-date">
            <label className="label">
              <span className="label-text">Return date: </span>
            </label>
            <input
              onKeyDown={(e) => e.preventDefault()}
              required
              type="date"
              placeholder="Click to choose return date"
              className="input-date"
              min={
                booking?.departureDate || new Date().toISOString().split("T")[0]
              }
              onChange={(e) =>
                setBooking({ ...booking, returnDate: e.target.value })
              }
            />
          </div>
        </div>
        <br />
        <button className="create-button" type="submit">
          Create booking
        </button>
      </form>
      {showBooking && (
        <div className="latest-booking">
          <div className="latest-booking-info">
            <h2>Latest Booking</h2>
            <span
              className="close-latest-booking"
              onClick={() => setShowBooking(false)}
            >
              X
            </span>
          </div>
          <Booking booking={latestBooking} />
        </div>
      )}
      {showModal && (
        <AlertModal
          showModal={showModal}
          setShowModal={setShowModal}
          booking={booking}
          setLatestBooking={setLatestBooking}
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          displayText="Are you sure you want to create this booking?"
        />
      )}
    </>
  );
};

export default BookingForm;
