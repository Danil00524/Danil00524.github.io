import React from "react";
import { Link } from 'react-router-dom';

import './SingleContentElem.scss'
import catalogItemBannerImg from "../../../img/catalog-item-banner.jpg";
import Button from "../../Button";
import Plx from "react-plx";

const SingleContentElemBanner = () => {
  const bgStyle = {
    backgroundImage: `url(${catalogItemBannerImg})`
  };

  const parallaxImg = [
    {
      start: 'self',
      startOffset: '450px',
      duration: '100vh',
      properties: [
        {
          startValue: -100,
          endValue: 100,
          property: 'translateY',
        }
      ],
    }
  ];

  return (
      <div className="catalog-item banner-item">
        <div className="item-content position-relative">
          <div className="item-img overflow-hidden position-relative">
            <Plx className="item-img-parallax bg-cover" style={bgStyle} parallaxData={parallaxImg}></Plx>
            <img src={catalogItemBannerImg} alt=""/>
          </div>
          <div className="item-info-container d-flex flex-column justify-content-center align-items-start text-color-darkbrown">
            <h5 className="title title-lg">Мы строим не дома, мы строим лучшую жизнь</h5>
            <span className="text text-md">По индивидуальным проектам от 35 000 руб/м2</span>
            <Link to='/contacts'>
              <Button className="rounded stroked transparent black-text" text="Заказать просчет"/>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default SingleContentElemBanner;
