import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import ArticleInfo from './components/ArticleInfo';
import AdditionalArticles from '../../containers/Articles';

import { articlesRequest } from '../../requests/articlesRequest';
import { getArticles } from '../../reducers/articlesReducer';
import store from '../../store/configureStore';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CallButton from "../../components/CallButton";

const BlogOpen = props => {
  const urlRequest = props.match.params.id;
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
    const detail = articles.filter(elem => elem.id == urlRequest);

    return (
      <div className="blog-open-page">
        <Header theme={'black'} className="bg-color-white" />
        <ArticleInfo detail={detail} />
        <AdditionalArticles linkName={'Все публикации'} titlePage={'Читайте также'} />
        <Footer />
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

export default connect(getArticles)(BlogOpen);
