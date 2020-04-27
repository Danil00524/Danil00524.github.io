import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { articlesRequest } from '../requests/articlesRequest';
import ArticleInfo from './components/ArticleInfo'

import store from '../store/configureStore';
import { getArticles } from '../reducers/articlesReducer';
import './Articles.scss'

const Articles = ({ titlePage = 'Статьи', linkName = 'Посмотреть больше', className = '' }) => {
  const articlesList = store.getState().articles.articlesList;

  const [articles, setArticles] = useState(articlesList)

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
    const lastArticles = articles.slice(-4);

    return (
      <section className={`blog-articles-section text-color-darkbrown bg-color-white ${className}`}>
        <div className="container">
          <h3 className="title title-xxl text-center">{titlePage}</h3>
          <div className="blog-items d-flex">
            {lastArticles.map(
              (elem, index) => {
                return <ArticleInfo key={elem.id} elem={elem} index={index}/>
              })
            }
          </div>
          <div className='text-center'>
            <Link to='/blog' className='btn rounded stroked transparent black-text'>
              {linkName}
            </Link>
          </div>
        </div>
      </section>
    )
  } else {
    return null;
  }
};

export default connect(getArticles)(Articles);
