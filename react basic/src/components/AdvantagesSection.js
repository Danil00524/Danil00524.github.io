import React from "react";

import './scss/AdvantagesSection.scss';
import clockIcon from '../img/clock.svg';
import clockShield from '../img/shield.svg';
import clockBadge from '../img/badge.svg';

const AdvantagesSection = (props) => {
  const cssClasses = (props.className || '');

  return (
      <section className={`advantages-section text-color-darkbrown bg-color-white ${cssClasses}`}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="advantage-item d-flex flex-column align-items-center text-center">
                <div className="icon">
                  <img src={clockIcon} alt=""/>
                </div>
                <h5 className="title title-sm">Строим быстро</h5>
                <p>Когда нужно начать работу над проектом, чтобы не попасть впросак</p>
              </div>
            </div>
            <div className="col">
              <div className="advantage-item d-flex flex-column align-items-center text-center">
                <div className="icon">
                  <img src={clockShield} alt=""/>
                </div>
                <h5 className="title title-sm">Строим качественно</h5>
                <p>Когда нужно начать работу над проектом, чтобы не попасть впросак</p>
              </div>
            </div>
            <div className="col">
              <div className="advantage-item d-flex flex-column align-items-center text-center">
                <div className="icon">
                  <img src={clockBadge} alt=""/>
                </div>
                <h5 className="title title-sm">Строим надежно</h5>
                <p>Когда нужно начать работу над проектом, чтобы не попасть впросак</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AdvantagesSection;
