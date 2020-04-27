import React from "react";
import { Link } from 'react-router-dom';

import './ShareOnSocials.scss';

const ShareOnSocials = ({className}) => {
  return (
      <div className={`share-on-socials d-flex justify-content-start align-items-center ${(className || '')}`}>
        <Link to='/' className="btn-share share-tw d-flex justify-content-center align-items-center">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.74003 4.5195L8.77905 5.16289L8.12875 5.0841C5.76165 4.78211 3.6937 3.75794 1.93789 2.03786L1.0795 1.18438L0.858396 1.81464C0.39018 3.21959 0.689318 4.70332 1.66477 5.70123C2.18501 6.25271 2.06795 6.33149 1.17054 6.00323C0.858396 5.89819 0.58527 5.8194 0.559258 5.8588C0.468216 5.95071 0.78036 7.14557 1.02747 7.61827C1.36563 8.27478 2.05495 8.91817 2.80929 9.29895L3.44659 9.60095L2.69224 9.61408C1.9639 9.61408 1.93789 9.62721 2.01593 9.90295C2.27605 10.7564 3.30352 11.6624 4.44805 12.0563L5.25442 12.3321L4.5521 12.7522C3.51162 13.3562 2.28905 13.6976 1.06649 13.7239C0.481222 13.737 0 13.7895 0 13.8289C0 13.9602 1.58673 14.6955 2.51016 14.9844C5.28043 15.8379 8.57095 15.4702 11.0421 14.0128C12.7979 12.9755 14.5537 10.914 15.3731 8.91817C15.8153 7.85461 16.2575 5.91132 16.2575 4.97906C16.2575 4.37506 16.2965 4.29628 17.0248 3.57411C17.454 3.15394 17.8572 2.69438 17.9353 2.56307C18.0653 2.3136 18.0523 2.3136 17.389 2.53681C16.2835 2.93072 16.1274 2.8782 16.6737 2.28734C17.0769 1.86716 17.5581 1.1056 17.5581 0.882385C17.5581 0.842994 17.363 0.908646 17.1419 1.02682C16.9078 1.15812 16.3876 1.35508 15.9974 1.47325L15.295 1.69647L14.6578 1.26317C14.3066 1.02682 13.8124 0.764212 13.5522 0.68543C12.8889 0.501605 11.8745 0.527865 11.2762 0.737951C9.65045 1.32882 8.62297 2.85194 8.74003 4.5195Z" fill="white"/>
          </svg>
        </Link>
        <Link to='/' className="btn-share share-fb d-flex justify-content-center align-items-center">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.81433 0.753433L6.83553 0.75C4.61241 0.75 3.17574 2.34382 3.17574 4.81067V6.68291H1.18615C1.01422 6.68291 0.875 6.83363 0.875 7.01953V9.73219C0.875 9.9181 1.01438 10.0686 1.18615 10.0686H3.17574V16.9136C3.17574 17.0995 3.31496 17.25 3.48689 17.25H6.08274C6.25467 17.25 6.39389 17.0993 6.39389 16.9136V10.0686H8.72019C8.89211 10.0686 9.03134 9.9181 9.03134 9.73219L9.03229 7.01953C9.03229 6.93027 8.99943 6.84478 8.94117 6.78161C8.88291 6.71845 8.80353 6.68291 8.72098 6.68291H6.39389V5.09579C6.39389 4.33296 6.562 3.9457 7.481 3.9457L8.81401 3.94519C8.98577 3.94519 9.125 3.79447 9.125 3.60874V1.08988C9.125 0.904318 8.98593 0.753776 8.81433 0.753433Z" fill="white"/>
          </svg>
        </Link>
        <Link to='/' className="btn-share share-vk d-flex justify-content-center align-items-center">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.88275 10.9978C9.88275 10.9978 10.2076 10.9624 10.374 10.787C10.5263 10.6262 10.521 10.3229 10.521 10.3229C10.521 10.3229 10.5008 8.90652 11.1707 8.69738C11.831 8.49171 12.6788 10.0671 13.5786 10.6729C14.2582 11.1309 14.7741 11.0307 14.7741 11.0307L17.1785 10.9978C17.1785 10.9978 18.4356 10.9218 17.8396 9.95131C17.7903 9.8718 17.4919 9.23317 16.0525 7.92135C14.5444 6.54817 14.7469 6.77027 16.5622 4.39464C17.668 2.94801 18.1099 2.06481 17.9717 1.68717C17.8405 1.32594 17.027 1.42187 17.027 1.42187L14.3207 1.43829C14.3207 1.43829 14.12 1.4115 13.9712 1.49878C13.826 1.58433 13.7318 1.78396 13.7318 1.78396C13.7318 1.78396 13.3039 2.90307 12.7325 3.85539C11.5273 5.86374 11.0457 5.97004 10.8485 5.8456C10.3898 5.55437 10.5043 4.67723 10.5043 4.05415C10.5043 2.10716 10.8054 1.2957 9.91884 1.0857C9.62479 1.0157 9.40822 0.969901 8.6555 0.962123C7.68972 0.952617 6.87273 0.96558 6.40965 1.18767C6.10151 1.33545 5.86381 1.66556 6.00907 1.68458C6.18779 1.70791 6.59276 1.79173 6.80758 2.07864C7.0849 2.44937 7.07521 3.28071 7.07521 3.28071C7.07521 3.28071 7.23456 5.57252 6.70281 5.85683C6.33833 6.05213 5.83828 5.65375 4.76333 3.8312C4.2131 2.89788 3.79756 1.86605 3.79756 1.86605C3.79756 1.86605 3.71744 1.67334 3.57394 1.56964C3.4005 1.44433 3.1584 1.40545 3.1584 1.40545L0.586807 1.42187C0.586807 1.42187 0.20032 1.43224 0.0585791 1.59729C-0.0673154 1.74334 0.0488949 2.04667 0.0488949 2.04667C0.0488949 2.04667 2.06233 6.67089 4.34251 9.00157C6.43342 11.1378 8.80692 10.9978 8.80692 10.9978H9.88275Z" fill="white"/>
          </svg>
        </Link>
      </div>
  );
};

export default ShareOnSocials;