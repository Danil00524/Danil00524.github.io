import React from "react";
import { Link } from "react-router-dom";

import './ProjectsSection.scss';
import photoItem1 from '../../../../img/sidebar-categories-item-1.jpg';
import photoItem2 from '../../../../img/sidebar-categories-item-2.svg';
import photoItem3 from '../../../../img/sidebar-categories-item-3.svg';

 const ProjectsSection = () => {
  return (
      <section className="projects-section bg-color-white">
        <div className="container">
          <div className="projects-info d-flex flex-column align-items-center text-center">
            <h5 className="title title-lg">Наша главная гордость — дома, которые мы уже построили или над которыми работаем прямо сейчас</h5>
            <p className="text text-md">Мы постарались рассказать о каждом из них то, что действительно важно. Как шла работа над проектом, какие задачи решались, и с какими сложностями мы столкнулись при строительстве.</p>
          </div>
          <div className="projects-items d-flex">
            <div className="item-wrapper aside-item-link">
              <article className="aside-item d-flex">
                <Link to='/catalog' className="item-img overflow-hidden flex-shrink-0 position-relative">
                  <img src={photoItem1} alt=""/>
                    <div className="overlay d-flex justify-content-center align-items-center position-absolute text-color-white w-100 h-100">
                      <span>Посмотреть</span>
                    </div>
                </Link>
                <div className="item-info d-flex flex-column">
                  <h5 className="title title-md">
                    <Link to='/catalog'>Бани из клееного бруса</Link>
                  </h5>
                  <Link to='/catalog' className="text text-sm d-flex align-items-center">
                    Подробнее
                    <i className="icon d-flex">
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="#352929" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.789039 8.91097C1.03004 9.14595 1.41443 9.14595 1.65543 8.91097L4.93232 5.716C5.33485 5.32353 5.33485 4.67647 4.93232 4.284L1.65543 1.08904C1.41443 0.854061 1.03004 0.854061 0.789038 1.08904C0.539253 1.33258 0.539253 1.7341 0.789038 1.97764L3.8889 5L0.78904 8.02237C0.539254 8.26591 0.539254 8.66743 0.789039 8.91097Z"/>
                      </svg>
                    </i>
                  </Link>
                </div>
              </article>
            </div>
            <div className="item-wrapper aside-item-link">
              <article className="aside-item d-flex">
                <Link to='/catalog' className="item-img overflow-hidden flex-shrink-0 position-relative">
                  <img src={photoItem2} alt=""/>
                    <div className="overlay d-flex justify-content-center align-items-center position-absolute text-color-white w-100 h-100">
                      <span>Посмотреть</span>
                    </div>
                </Link>
                <div className="item-info d-flex flex-column">
                  <h5 className="title title-md">
                    <Link to='/catalog'>Дома из лиственницы</Link>
                  </h5>
                  <Link to='/catalog' className="text text-sm d-flex align-items-center">
                    Подробнее
                    <i className="icon d-flex">
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="#352929" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.789039 8.91097C1.03004 9.14595 1.41443 9.14595 1.65543 8.91097L4.93232 5.716C5.33485 5.32353 5.33485 4.67647 4.93232 4.284L1.65543 1.08904C1.41443 0.854061 1.03004 0.854061 0.789038 1.08904C0.539253 1.33258 0.539253 1.7341 0.789038 1.97764L3.8889 5L0.78904 8.02237C0.539254 8.26591 0.539254 8.66743 0.789039 8.91097Z"/>
                      </svg>
                    </i>
                  </Link>
                </div>
              </article>
            </div>
            <div className="item-wrapper aside-item-link">
              <article className="aside-item d-flex">
                <Link to='/catalog' className="item-img overflow-hidden flex-shrink-0 position-relative">
                  <img src={photoItem3} alt=""/>
                    <div className="overlay d-flex justify-content-center align-items-center position-absolute text-color-white w-100 h-100">
                      <span>Посмотреть</span>
                    </div>
                </Link>
                <div className="item-info d-flex flex-column">
                  <h5 className="title title-md">
                    <Link to='/catalog'>Беседки из сосны</Link>
                  </h5>
                  <Link to='/catalog' className="text text-sm d-flex align-items-center">
                    Подробнее
                    <i className="icon d-flex">
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="#352929" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.789039 8.91097C1.03004 9.14595 1.41443 9.14595 1.65543 8.91097L4.93232 5.716C5.33485 5.32353 5.33485 4.67647 4.93232 4.284L1.65543 1.08904C1.41443 0.854061 1.03004 0.854061 0.789038 1.08904C0.539253 1.33258 0.539253 1.7341 0.789038 1.97764L3.8889 5L0.78904 8.02237C0.539254 8.26591 0.539254 8.66743 0.789039 8.91097Z"/>
                      </svg>
                    </i>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ProjectsSection;
