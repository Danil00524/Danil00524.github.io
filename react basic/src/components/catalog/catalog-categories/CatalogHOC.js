import React, { useState } from 'react';
import Plx from 'react-plx';

import './CatalogHOC.scss';

import CatalogContent from './CatalogContent';
import FilterContainer from "../FilterContainer";
import Breadcrumbs from "../../Breadcrumbs";
import TabsControl from "../../TabsControl";

const CatalogHOC = ({ house, historyContentType }) => {
  const [contentType, setContentType] = useState('Все');
  const [filterOption, setFilterOption] = useState({})

  // const [histContentType, setHistContentType] = useState(null)
  // if (historyContentType != contentType) {
  //   setHistContentType(histContentType)
  // }
  // console.log(histContentType)
  // console.log(contentType)
  // console.log(historyContentType)

  const setContent = (value) => {
    setContentType(value);
  };

  const setFilter = (value) => {
    setFilterOption(value)
  };

  const parallax = {
    title: [
      {
        start: '1vh',
        duration: '30vh',
        properties: [
          {
            startValue: 0,
            endValue: -100,
            property: 'translateY',
          }
        ],
      }
    ],

    tabs: [
      {
        start: '1vh',
        duration: '40vh',
        properties: [
          {
            startValue: 0,
            endValue: -80,
            property: 'translateY',
          }
        ],
      }
    ],

    filter: [
      {
        start: '1vh',
        duration: '50vh',
        properties: [
          {
            startValue: 0,
            endValue: -60,
            property: 'translateY',
          }
        ],
      }
    ]
  };

  const tabsList = ['Все', 'Дома', 'Бани', 'Беседки'];

  return (
    <section className="hero-section text-color-white position-relative">
      <div className="section-control">
        <div className="container d-flex flex-column align-items-center">

          <Plx className="d-flex flex-column align-items-center" parallaxData={parallax.title}>
            <h5 className="title title-lg">Категории</h5>
            <h1 className="title title-main text-center">Мы строим не дома, мы строим лучшую жизнь</h1>

            <Breadcrumbs
              contentTab={contentType}
              link={window.location.pathname} />
          </Plx>

          <Plx parallaxData={parallax.tabs}>
            <TabsControl
              tabsList={tabsList}
              activeTabIndex={0}
              setContent={setContent} />
          </Plx>

          <Plx className="z-index-5 filter-container" parallaxData={parallax.filter}>
            <FilterContainer
              setContent={setContent}
              contentType={contentType}
              filterOption={setFilter} />
          </Plx>

        </div>
      </div>
      <div className="section-content bg-color-darkbrown position-relative overflow-hidden">
        <CatalogContent
          contentType={contentType}
          filterOption={filterOption}
          state={house} />
      </div>
    </section>
  )
};

export default CatalogHOC;
