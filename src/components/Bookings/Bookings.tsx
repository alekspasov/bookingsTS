import { useCallback, useContext, useEffect, useState } from "react";
import AppState from "../../context/AppState";
import { getAllBookings } from "../../services/bookings.service";
import Booking from "../Booking/Booking";
import "./Bookings.css";
import Loader from "../Loader/Loader";
import { BookingType } from "../../common/types";

type BookingsArr = BookingType[];

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingsArr>([]);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { showBookings, setShowBookings } = useContext(AppState);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getAllBookings().then((response) => setBookings(response));
  }, []);

  useEffect(() => {
    if (showBookings) {
      setShowLoader(!showLoader);
      getAllBookings().then((response) => {
        setBookings(response);
        setIndex(1);
        setShowBookings(false);
        setShowLoader(false);
      });
    }
  }, [showBookings]);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newBookings = await getAllBookings(index);
      setBookings((prevBookings) => [...prevBookings, ...newBookings]);
    } catch (err) {
      console.log(err);
    }
    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div id="bookings">
          <h2 className="bookings-header">All Bookings</h2>
          {bookings.map((booking) => {
            return (
              <div key={booking.id}>
                <Booking booking={booking} setIndex={setIndex} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Bookings;
