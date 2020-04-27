import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import './ProductCard.scss';
import ProductCardHOC from "./ProductCardHOC"
import Articles from "../../containers/Articles";
import Footer from "../../components/layout/footer/Footer";
import NotFound404 from '../../components/NotFound404'
import CallButton from "../../components/CallButton";
import { useBreakpoint } from "../../components/Breakpoints";

import store from '../../store/configureStore';
import { articlesRequest } from '../../requests/articlesRequest';
import { housesRequest } from '../../requests/housesRequest';

import { getHouses } from '../../reducers/housesReducer';

import Loader from 'react-loader-spinner';

const ProductCard = props => {
  const articleList = store.getState().articles.articlesList;
  const housesList = store.getState().houses.housesList;

  const [articles, setArticles] = useState(articleList);
  const [houses, setHouses] = useState(housesList);

  const checkArticle = () => {
    if (!articleList) {
      articlesRequest()
        .then(res => setArticles(res.data))
        .catch(err => console.error(err))
    }
  }

  const checkHouses = () => {
    if (!housesList) {
      housesRequest()
        .then(res => setHouses(res.data))
        .catch(err => console.error(err))
    }
  }
  const breakpoints = useBreakpoint();

  useEffect(() => {
    checkArticle()
    checkHouses()
  }, []);


  if (houses && articles) {
    const urlRequest = props.match.params.id;
    const lastsProductCard = houses.slice(-2)
    const productCard = houses.filter(elem => elem.id == urlRequest);

    if (!productCard.length) {
      return (
        <NotFound404 />
      )
    }

    return (
      <div className="product-card-page bg-color-darkbrown overflow-hidden position-relative">
        {productCard.map(
          (elem, index) =>
            <ProductCardHOC
              key={index}
              elem={elem}
              lastsProductCard={lastsProductCard} />
        )}
        <Articles className="d-none d-xl-block bg-color-transparent position-relative z-index-5" />
        <Footer className="position-relative z-index-5" />
        <CallButton />
      </div>
    )
  }
  return <Loader
    className="text-center"
    type="Triangle"
    height={100}
    width={100} />;
};

export default connect(getHouses)(ProductCard);
