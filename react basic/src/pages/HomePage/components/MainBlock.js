import React from 'react';
import Plx from 'react-plx';

import './MainBlock.scss';

import { Link } from 'react-router-dom';
import Button from "../../../components/Button";
import SocialsBlock from "../../../components/layout/SocialsBlock";
import {useBreakpoint} from "../../../components/Breakpoints";

const MainBlock = () => {
  const breakpoints = useBreakpoint();
  
  const parallax = {
    topInfo: [
      {
        start: '1vh',
        end: '100%',
        properties: [
          {
            startValue: 640,
            endValue: 0,
            property: 'width',
          },
        ],
      }
    ],
    bottomInfo: [
      {
        start: '1vh',
        end: '100%',
        properties: [
          {
            startValue: 0,
            endValue: 100,
            property: 'translateY',
          },
        ],
      },
      {
        start: '1vh',
        end: '100%',
        properties: [
          {
            startValue: 1,
            endValue: 0,
            property: 'opacity',
          },
        ],
      }
    ],
  };
  
  return (
    <main className="main-content d-flex flex-column flex-grow-1">
      <div className="custom-container d-flex flex-column flex-grow-1">
        <Plx className="d-flex align-items-center flex-grow-1 overflow-hidden" parallaxData={parallax.topInfo} disabled={breakpoints.lg}>
          <section className="top-section d-flex flex-column justify-content-center align-items-start">
            <h1 className="title title-main">Мы строим не дома,{!breakpoints.md ? <br/> : ''} мы строим лучшую жизнь</h1>
            <span className="text text-lg">По индивидуальным проектам от 35 000 руб/м2</span>
            <Link to='/catalog'>
              <Button className="rounded black-text bg-white" text={'Выбрать проект'}/>
            </Link>
          </section>
        </Plx>
        <Plx parallaxData={parallax.bottomInfo} disabled={breakpoints.xl}>
          <section className="bottom-section flex-shrink-0 d-flex align-items-center">
            <a href="tel:88007503245" className="phone-number d-none d-md-flex align-items-center">
              <i className="icon d-flex justify-content-center align-items-center">
                <svg width="18px" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.85 10.65C11.75 11.75 11.75 12.85 10.65 12.85C9.55 12.85 8.45 11.75 7.35 10.65C6.25 9.55 5.15 8.45 5.15 7.35C5.15 6.25 6.50654 5.99346 7.35 5.15C8.45 4.05 5.15 0.75 4.05 0.75C2.95 0.75 0.75 4.05 0.75 4.05C0.75 6.25 3.0105 10.7105 5.15 12.85C7.2895 14.9895 11.75 17.25 13.95 17.25C13.95 17.25 17.25 15.05 17.25 13.95C17.25 12.85 13.95 9.55 12.85 10.65Z"/>
                </svg>
              </i>
              8 800 750 32 45
            </a>
            <SocialsBlock className={`ml-auto ${ breakpoints.md ? 'mx-auto' : ''}`}/>
          </section>
        </Plx>
      </div>
    </main>
    )
};

export default MainBlock;
