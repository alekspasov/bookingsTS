import { useEffect, useState } from "react";
import "./GoUpButton.css";

const GoUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <>
      {showButton && (
        <div className="go-up-button" onClick={scrollToTop}>
          TOP
        </div>
      )}
    </>
  );
};

export default GoUpButton;
