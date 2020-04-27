import React from "react";

import './AboutUsInfoSection.scss';
import img1 from '../../../img/about-us-info-1.jpg';
import img2 from '../../../img/about-us-info-2.jpg';

const AboutUsInfoSection = () => {
  return (
    <section className="about-us-info-section bg-color-darkbrown text-color-white">
      <div className="container-fluid p-0">
        <div className="first-section">
          <div className="row no-gutters">
            <div className="col">
              <div className="img-container section-letter letter-o1 z-index-1">
                <img src={img1} alt=""/>
              </div>
            </div>
            <div className="col">
              <div className="info-container section-letter letter-o2">
                <div className="info-item">
                  <h5 className="title title-md">Собственное производство</h5>
                  <p className="text text-md">В любой момент вы можете приехать и сами посмотреть, как идут дела по вашему строению.</p>
                </div>
                <div className="info-item">
                  <h5 className="title title-md">Архитектурно дизайнерская студия</h5>
                  <p className="text text-md">Первая стадия работы над вашим домом – детально проработанный проект. Фактически это строительство на бумаге с учетом всех ваших пожеланий.</p>
                </div>
                <div className="info-item">
                  <h5 className="title title-md">Сервис и обслуживание</h5>
                  <p className="text text-md">Главная задача технического обслуживания – поддерживать эксплуатационное состояние вашего деревянного строения.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second-section">
          <div className="row no-gutters">
            <div className="col">
              <div className="info-container d-flex flex-column align-items-end section-letter letter-d1">
                <h3 className="title title-xxl">Строительство</h3>

                <div className="info-item">
                  <h5 className="title title-md">Генеральный подрядчик</h5>
                  <p className="text text-md">Мы проведем вас по всем этапам строительства дома вашей мечты — от эскизов в карандаше до первогоотпразднованного здесь дня рождения.</p>
                </div>
                <div className="info-item">
                  <h5 className="title title-md">Отдельные общестроительные работы</h5>
                  <p className="text text-md">Мы предпочитаем сами доводить дом до идеала и любим интересные задачи. Поэтому иногда выполняем нестандартные работы по отделке и комплектации.</p>
                </div>
                <div className="info-item">
                  <h5 className="title title-md">Сервисное обслуживание</h5>
                  <p className="text text-md">Для нас важно, что происходит со строением после завершения строительства. Поэтому мы создали службу эксплуатации, которая поддерживает ваш деревянный дом в форме.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="img-container">
                <img src={img2} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsInfoSection;
