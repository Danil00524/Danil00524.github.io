import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './AboutUsPage.scss';

import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import InstagramSection from "../../components/InstagramSection";
import AdvantagesSection from "../../components/AdvantagesSection";
import AboutUsHeroSection from "./components/AboutUsHeroSection";
import Articles from '../../containers/Articles'
import AboutUsInfoSection from "./components/AboutUsInfoSection";
import AboutUsVideoSection from "./components/AboutUsVideoSection";
import AboutUsMapSection from "./components/AboutUsMapSection";
import AboutUsProjectsSection from "./components/AboutUsProjectsSection";
import AboutUsHOC from "./AboutUsHOC";
import CallButton from "../../components/CallButton";

import { articlesRequest } from '../../requests/articlesRequest'

import store from '../../store/configureStore';
import { getArticles } from '../../reducers/articlesReducer';

import Loader from 'react-loader-spinner';

const AboutUsPage = () => {
  const articlesList = store.getState().articles.articlesList;
  
  const [articles, setArticles] = useState(articlesList);

  const checkArticles = () => {
    if (!articlesList) {
      articlesRequest()
        .then(res => setArticles(res.data))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    checkArticles();
  }, [])


  if (articles) {
    return (
      <div className="about-us-page position-relative">
        <Header theme="black" showButton={true} />
        <AboutUsHeroSection />
        <AboutUsVideoSection />
        <AboutUsInfoSection />
        <AboutUsMapSection />
        <AboutUsProjectsSection />
        <AboutUsHOC />
        <Articles />
        <InstagramSection />
        <AdvantagesSection />
        <Footer />
        <CallButton />
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

export default connect(getArticles)(AboutUsPage);
