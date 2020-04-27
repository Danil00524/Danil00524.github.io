import React from "react";

import './scss/InstagramSection.scss';
import instaIcon1 from '../img/insta-icon-1.svg';
import instaIcon4 from '../img/insta-icon-4.png';
import instaIcon5 from '../img/insta-icon-5.svg';
import instaIcon from '../img/insta-icon.svg';

const InstagramSection = () => {
  return (
      <section className="instagram-section text-color-darkbrown bg-color-white overflow-hidden">
        <div className="container-fluid px-0">
          <div className="title-container d-flex flex-column align-items-center">
            <img src={instaIcon} alt="" className="icon"/>
              <h3 className="title title-xxl">@woodland</h3>
          </div>
          <div className="image-items-container d-flex">
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon1} alt=""/>
              </div>
            </div>
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon5} alt=""/>
              </div>
            </div>
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon4} alt=""/>
              </div>
            </div>
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon4} alt=""/>
              </div>
            </div>
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon5} alt=""/>
              </div>
            </div>
            <div className="image-item-wrapper">
              <div className="image-item">
                <img src={instaIcon1} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default InstagramSection;
