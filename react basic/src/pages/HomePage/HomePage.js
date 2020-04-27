import React, { useState, useEffect } from 'react';

import Header from "../../components/layout/header/Header";
import MainBlock from "./components/MainBlock";
import Aside from './Aside';
import Loader from 'react-loader-spinner';
import Plx from 'react-plx';
import './HomePage.scss';
import {useBreakpoint} from './../../components/Breakpoints';

import store from '../../store/configureStore';

import { connect } from 'react-redux';
import { getArticles } from '../../reducers/articlesReducer';
import { articlesRequest } from '../../requests/articlesRequest'

const HomePage = () => {
  const breakpoints = useBreakpoint();
  
  const checkBreakpoint = (def = 0, xxl = 0, xl = 0, lg = 0, md = 0, sm = 0) => {
    if (breakpoints.xl && xxl) return xxl;
    else if (breakpoints.lg && xl) return  xl;
    else if (breakpoints.lg && lg) return  lg;
    else if (breakpoints.md && md) return  md;
    else if (breakpoints.sm && sm) return  sm;
    else return def;
  };
  
  const articleList = store.getState().articles.articlesList;

  const [content, setContent] = useState(articleList);

  const chechArticle = () => {
    if (!content) {
      articlesRequest()
        .then(res => setContent(res.data))
        .catch(err => console.error(err))
    }
  };

  useEffect(() => {
    chechArticle()
  }, [])

  const parallax = {
    header: [
      {
        start: '1vh',
        end: '100%',
        properties: [
          {
            startValue: 0,
            endValue: -100,
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
    aside: [
      {
        start: '1vh',
        end: '100%',
        properties: [
          {
            startValue: checkBreakpoint(366, 336),
            endValue: 0,
            // unit: '%',
            property: 'width',
          },
        ],
      }
    ]
  };

  if (content) {
    return (
      <div className="home-page d-flex flex-column hide-scrollbar">
        <section className="main-section position-relative flex-shrink-0">
          <div className="main-section-content d-flex flex-column flex-xl-row w-100">
            <div className="home-page-bg d-flex flex-column text-color-white bg-color-darkbrown bg-cover flex-grow-1">
              <Plx parallaxData={parallax.header} disabled={breakpoints.xl}>
                <Header theme="white" isCustomContainer={true}/>
              </Plx>
              <MainBlock/>
            </div>
            <Plx className="aside-wrapper" parallaxData={parallax.aside} disabled={breakpoints.xl}>
              <Aside articles={content}/>
            </Plx>
          </div>
        </section>
        <section className="mirror-section flex-shrink-0"/>
      </div>
    )
  } else {
    return <Loader
      className="text-center"
      type="Triangle"
      height={100}
      width={100} />;
  }
};

export default connect(getArticles)(HomePage);
