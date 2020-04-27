import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import AdvantagesSection from "../../components/AdvantagesSection";
import BlogHOC from './BlogHOC';
import InfoAboutPage from './components/InfoAboutPage'
import CallButton from "../../components/CallButton";
import AdditionalArticles from '../../containers/Articles';

import { articlesRequest } from '../../requests/articlesRequest'

import store from '../../store/configureStore';
import { getArticles } from '../../reducers/articlesReducer';

import Loader from 'react-loader-spinner';

const Blog = () => {
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
      <div className="blog-page">
        <Header theme="black" showButton={true} />
        <InfoAboutPage />
        <BlogHOC articles={articles}/>
        <AdvantagesSection />
        <AdditionalArticles linkName={'Все публикации'} titlePage={'Популярные статьи'} />
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

export default connect(getArticles)(Blog);
