import { createContext } from "react";
import { AirportType } from "../common/types";

export interface AppStateType {
  airports: AirportType[];
  showBookings: boolean | null;
  setAirports: (airports: AirportType[]) => void;
  setShowBookings: (showBookings: boolean) => void;
}

const AppState = createContext<AppStateType>({
  airports: [],
  setAirports() {},
  showBookings: null,
  setShowBookings() {},
});

export default AppState;
