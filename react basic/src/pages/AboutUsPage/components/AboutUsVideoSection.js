import React from "react";

import './AboutUsVideoSection.scss';
import img from '../../../img/about-us-video-preview.png';

const AboutUsVideoSection = () => {
  return (
      <section className="about-us-video-section bg-color-darkbrown text-color-white">
        <div className="container d-flex flex-column align-items-center section-letter letter-w">
          <h2 className="title title-xxl text-center">Woodland компания полного цикла</h2>
          <p className="text text-md text-center">Мы делаем все для вашего деревянного дома. Наша архитектурная студия разработает проект, сруб будет выполнен на собственной производственной площадке, дальше — этап строительства. Комплектацией займется наш дизайнер, а обслуживанием — отдел эксплуатации.</p>
          <div className="video-container position-relative overflow-hidden z-index-1">
            <img src={img} alt=""/>
          </div>
        </div>
      </section>
  );
};

export default AboutUsVideoSection;
