import { useContext, useEffect, useState } from "react";
import "./AlertModal.css";
import AppState from "../../context/AppState";
import { createNewBooking } from "../../services/bookings.service";
import { BookingType } from "../../common/types";

interface AlertModalInterface {
  showModal?: boolean;
  setShowModal: (showModal: boolean) => void;
  booking?: BookingType;
  remove?: boolean;
  setRemove?: (remove: boolean) => void;
  setLatestBooking?: (latestBooking: BookingType) => void;
  showBooking?: boolean;
  setShowBooking?: (showBooking: boolean) => void;
  displayText: string;
  setBooking?: (booking: BookingType) => void;
}

const AlertModal: React.FC<AlertModalInterface> = ({
  showModal,
  setShowModal,
  displayText,
  booking,
  remove,
  setRemove,
  setLatestBooking,
  showBooking,
  setShowBooking,
  setBooking
}) => {
  const { setShowBookings } = useContext(AppState);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (showModal) {
      (document.querySelector(`.myModal`) as HTMLDialogElement).showModal();
    }
  }, [showModal]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (displayText.includes("create")) {
      setCreating(!creating);

      return;
    }
    if (displayText.includes("delete")) {
      setRemove && setRemove(!remove);
      setShowModal && setShowModal(!setShowModal);
    }
  };

  useEffect(() => {
    if (creating) {
      if (booking) {
        createNewBooking(booking).then((response) => {
          setLatestBooking && setLatestBooking({ ...response });
          if(showBooking === false){
            setShowBooking && setShowBooking(!showBooking);
          }
          setCreating(!creating);
          setShowModal && setShowModal(!showModal);
          setShowBookings(true);
          setBooking && setBooking({});
        });
      }
    }
  }, [creating]);

  return (
    <dialog className="myModal">
      <div className="modal-content">
        {displayText}
        <div className="modal-buttons">
          <button className="confirm-button" autoFocus onClick={handleClick}>
            Confirm
          </button>
          <button
            className="close-button"
            autoFocus
            onClick={() => setShowModal(!showModal)}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AlertModal;
