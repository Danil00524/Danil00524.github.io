import React from "react";

import './ServiceHeroSection.scss';
import Breadcrumbs from "../../../components/Breadcrumbs";

const ServiceHeroSection = ({contentTab}) => {
  return (
    <section className="service-hero-section d-flex">
      <div className="container d-flex flex-column">
        <div className="title-info d-flex flex-column justify-content-center align-items-center">
          <h5 className="title title-lg">Услуги</h5>
          <h1 className="title title-main text-center">Мы строим не дома, мы строим лучшую жизнь</h1>
          <Breadcrumbs contentTab={contentTab} link={window.location.pathname}/>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
