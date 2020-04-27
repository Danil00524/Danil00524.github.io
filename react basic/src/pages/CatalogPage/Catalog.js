import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Catalog.scss';
import Header from "../../components/layout/header/Header";
import CatalogPageBackground from "./components/CatalogPageBackground";
import CatalogHOC from '../../components/catalog/catalog-categories/CatalogHOC';
import ProjectsSection from "./components/sections/ProjectsSection";
import Articles from "../../containers/Articles";
import InstagramSection from "../../components/InstagramSection";
import AdvantagesSection from "../../components/AdvantagesSection";
import Footer from "../../components/layout/footer/Footer";

import { housesRequest } from '../../requests/housesRequest';
import { articlesRequest } from '../../requests/articlesRequest'

import store from '../../store/configureStore';
import { getHouses } from '../../reducers/housesReducer';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CallButton from "../../components/CallButton";

const Catalog = (props) => {
  const historyContentType = props.history.location.state;

  const housesList = store.getState().houses.housesList;
  const articlesList = store.getState().articles.articlesList;

  const [houses, setHouses] = useState(housesList);
  const [articles, setArticles] = useState(articlesList);

  const checkHouses = () => {
    if(!housesList) {
      housesRequest()
        .then(res => setHouses(res.data))
        .catch(err => console.error(err))
    }
  }

  const checkArticles = () => {
    if(!articlesList) {
      articlesRequest()
        .then(res => setArticles(res.data))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    checkHouses();
    checkArticles();
  }, [])

  if (houses && articles) {
    return (
      <div className="catalog-page position-relative">
        <CatalogPageBackground/>
        <Header theme="white" showButton={true}/>
        <main>
          <CatalogHOC house={houses} historyContentType={historyContentType}/>
          <ProjectsSection/>
          <Articles/>
          <InstagramSection/>
          <AdvantagesSection/>
          <Footer/>
        </main>
        <CallButton/>
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

export default connect(getHouses)(Catalog);
