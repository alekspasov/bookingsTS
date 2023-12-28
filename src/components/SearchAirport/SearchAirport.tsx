import { useContext, useEffect, useState } from "react";
import AppState from "../../context/AppState";
import "./SearchAirport.css";
import { AirportType, BookingType } from "../../common/types";

type SearchedAirportsType = AirportType[];
interface SearchAirportInterface {
  setBooking: (booking: BookingType) => void;
  booking: BookingType;
  clearAirport: boolean;
  setClearAirport: (clearAirport: boolean) => void;
}

const SearchAirport = ({
  setBooking,
  booking,
  clearAirport,
  setClearAirport,
}: SearchAirportInterface) => {
  const { airports } = useContext(AppState);

  const [searchedAirports, setSearchedAirports] =
    useState<SearchedAirportsType>([]);
  const [chosenAirport, setChosenAirport] = useState("");

  useEffect(() => {
    if (clearAirport) {
      setChosenAirport("");
      setClearAirport(!clearAirport);
    }
  }, [clearAirport]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value === "") {
      setChosenAirport(e.target.value);
      setSearchedAirports([]);
      return;
    }
    setChosenAirport(e.target.value);
    const searchedAirports = airports.filter((airport) =>
      airport.title?.toLowerCase().includes(chosenAirport)
    );
    console.log(searchedAirports);
    setSearchedAirports(searchedAirports);
  };

  const handleClick = (id: number, title: string) => {
    if (booking) {
      if (!booking.departureAirportId) {
        setChosenAirport(title);
        setBooking({ ...booking, departureAirportId: id });
        console.log(booking.departureAirportId);
        setSearchedAirports([]);
        return;
      }
      setChosenAirport(title);
      setBooking({ ...booking, arrivalAirportId: id });
      setSearchedAirports([]);
    }
  };

  const handleShow = () => {
    if (searchedAirports.length === 0) {
      setSearchedAirports([...airports]);
      return;
    }
    setSearchedAirports([]);
  };

  return (
    <>
      <div>
        <div className="searchBar">
          <input
            required
            className="airport-search"
            value={chosenAirport}
            type="search"
            placeholder="Search airport"
            onChange={handleSearch}
          />
          <div id="show-all-airports" onClick={handleShow}>
            <span>All</span>
          </div>
        </div>
      </div>

      {searchedAirports && (
        <div className="airports">
          {searchedAirports.map((airport) => (
            <div
              key={airport.id}
              className="airport"
              onClick={() =>
                handleClick(airport.id as number, airport.title as string)
              }
            >
              <span>{airport.title}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchAirport;
