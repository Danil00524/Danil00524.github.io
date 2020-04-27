import React from "react";

import './CatalogCard.scss';
import {Link} from "react-router-dom";

const CatalogCard = ({cardImg, title, desc, link}) => {
  return (
      <>
        <Link className="catalog-card" to={link}>
          <img className="card-img" src={cardImg} alt=""/>
          <div className="card-overlay text-color-white d-flex flex-column justify-content-end align-items-center">
            <h3 className="title title-xxl">{title}</h3>
            <span className="text text-lg">{desc}</span>
          </div>
        </Link>
      </>
  );
};

export default CatalogCard;
