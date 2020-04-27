import React from 'react';
import { Link } from 'react-router-dom';
import Plx from 'react-plx';

import './SingleContentElem.scss';

const SingleContentElem = ({ elem }) => {
  const { id, description, floors = '-', metres, bedroom = '-', name, photo } = elem;

  const bgStyle = {
    backgroundImage: `url(${photo})`
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
    <div className="catalog-item">
      <div className="item-content overflow-hidden position-relative">
        <div className="item-overlay"></div>
        <div className="item-img overflow-hidden position-relative">
          <Plx className="item-img-parallax bg-cover" style={bgStyle} parallaxData={parallaxImg}></Plx>
          <img src={photo} alt="" />
          <div className="img-overlay"></div>
        </div>
        <div className="item-info-container text-center overflow-hidden">
          <div className="item-info">
            <h3 className="title title-xxl">{name}</h3>
            <span className="text text-lg">{description}</span>
            <div className="second-info d-flex flex-column align-items-center">
              <a href={`/product-card/${id}`} className="btn rounded stroked transparent white-text">Подробнее</a>
              <div className="item-stats d-flex justify-content-around w-100">
                <span className="stat-counter">Этажей: {floors ? floors : '-'}</span>
                <span className="stat-counter">Метраж: {metres} м2</span>
                <span className="stat-counter">Спален: {bedroom ? bedroom : '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default SingleContentElem;
