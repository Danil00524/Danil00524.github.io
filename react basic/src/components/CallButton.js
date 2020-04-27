import React from "react";
import './scss/CallButton.scss';

const CallButton = () => {
  return (
      <a href="tel:88007503245" className="call-btn d-none d-xl-flex justify-content-center align-items-center position-fixed">
        <svg className="tel-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2778 11.8333C13.0556 13.0555 13.0556 14.2777 11.8334 14.2777C10.6112 14.2777 9.38893 13.0555 8.16671 11.8333C6.94449 10.611 5.72226 9.38881 5.72226 8.16658C5.72226 6.94436 7.22953 6.65932 8.16671 5.72214C9.38893 4.49992 5.72226 0.833252 4.50004 0.833252C3.27782 0.833252 0.833374 4.49992 0.833374 4.49992C0.833374 6.94436 3.34504 11.9005 5.72226 14.2777C8.09948 16.6549 13.0556 19.1666 15.5 19.1666C15.5 19.1666 19.1667 16.7221 19.1667 15.4999C19.1667 14.2777 15.5 10.611 14.2778 11.8333Z" fill="white"/>
        </svg>
        <span className="ripple pinkBg"></span>
        <span className="ripple pinkBg"></span>
        <span className="ripple pinkBg"></span>
      </a>
  );
};

export default CallButton;
