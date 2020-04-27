import React, { useEffect, useState } from "react";

import './AboutUsProjectsSection.scss';
import { NavLink } from "react-router-dom";
import SingleContentElem from "../../../components/catalog/catalog-categories/SingleContentElem";

import store from '../../../store/configureStore';

import { housesRequest } from '../../../requests/housesRequest'

const AboutUsProjectsSection = () => {
  const housesList = store.getState().houses.housesList;

  const [houses, setHouses] = useState(housesList)

  const checkHouses = () => {
    if (!housesList) {
      housesRequest()
        .then(res => setHouses(res.data))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    checkHouses()
  }, [])

  if (houses) {
    const lastHouses = houses.slice(-2)

    return (
      <section className="about-us-projects bg-color-darkbrown text-color-white">
        <div className="container d-flex flex-column section-letter letter-n">
          <h2 className="about-us-section-title title title-xxl text-center">Наши готовые проекты</h2>
          <span className="about-us-section-desc text text-lg text-center mx-auto">Нашим поставщикам хорошо известны высокие требования Woodland к материалам. Кедр и лиственницу мы закупаем на Алтае и в Красноярском крае, сосну — в Кировске.</span>

          <div className="catalog-wrapper d-flex flex-wrap section-letter letter-a">
            {lastHouses.map(elem => {
              return <SingleContentElem elem={elem} key={elem.id} />
            })}
          </div>

          <NavLink
            className="btn rounded stroked transparent white-text mx-auto"
            to={'/catalog'}>
            {'Посмотреть все проекты'}
          </NavLink>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default AboutUsProjectsSection;
