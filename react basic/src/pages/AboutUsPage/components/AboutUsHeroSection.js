import React from "react";

import './AboutUsHeroSection.scss';
import Breadcrumbs from '../../../components/Breadcrumbs'
import AdvantagesSection from "../../../components/AdvantagesSection";

const AboutUsHeroSection = () => {
  return (
      <section className="about-us-hero-section d-flex bg-cover">
        <div className="container-fluid d-flex flex-column px-0">
          <div className="title-info bg-color-white d-flex flex-column justify-content-center align-items-center">
            <h5 className="title title-lg">О компании</h5>
            <h1 className="title title-main text-center">Мы строим не дома, мы строим лучшую жизнь</h1>
            <Breadcrumbs link={window.location.pathname}/>
          </div>


          <div className="bottom-bg d-flex bg-color-darkbrown mt-auto">
            <div className="container position-relative">
              <AdvantagesSection/>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutUsHeroSection;
