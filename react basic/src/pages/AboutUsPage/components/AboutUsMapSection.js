import React from "react";

import './AboutUsMapSection.scss';

const AboutUsMapSection = () => {
  return (
      <section className="about-us-map-section bg-contain bg-color-darkbrown text-color-white section-letter letter-l">
        <div className="container-fluid d-flex flex-column align-items-center p-0 text-center">
          <h2 className="title title-xxl">Работаем по всему миру</h2>
          <span className="text text-lg">Опыт строительства за рубежом дает нам возможность решать вопросы, связанные со спецификой работы в иностранном государстве</span>
          <span className="text text-md">Нашим поставщикам хорошо известны высокие требования Woodland к материалам. Кедр и лиственницу мы закупаем на Алтае и в Красноярском крае, сосну — в Кировске.</span>
        </div>
      </section>
  );
};

export default AboutUsMapSection;
