import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import store from '../../../store/configureStore';
import { articlesRequest } from '../../../requests/articlesRequest';
import { getArticles } from '../../../reducers/articlesReducer';

import SearchBtn from './components/SearchBtn';
import SearchInput from './components/SearchInput';

import './Search.scss';
const Search = () => {
  const articlesList = store.getState().articles.articlesList;

  const [articles, setArticles] = useState(articlesList);
  const [stateClick, setStateClick] = useState(false);

  const checkArticles = () => {
    if (!articlesList) {
      articlesRequest()
        .then(res => setArticles(res.data))
        .catch(err => console.error(err))
    }
  };

  const handlerClick = () => {
    setStateClick(!stateClick);
  };

  let headerNav;

  useEffect(() => {
    checkArticles();

    if (!headerNav) headerNav = document.querySelector('.header .navbar');
    stateClick ? headerNav.classList.add('hide-nav') : headerNav.classList.remove('hide-nav');
  }, [stateClick]);


  if (articles) {
    return (
      <>
        <SearchBtn handlerClick={handlerClick} />
        {stateClick ?
          <SearchInput
            articles={articles}
            handlerClick={handlerClick} stateClick={stateClick} />
          :
          ''
        }
      </>
    )
  } else {
    return null;
  }
};

export default connect(getArticles)(Search);
