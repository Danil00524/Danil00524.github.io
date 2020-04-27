import React, { useState, useEffect } from 'react';
import './ArticleInfo.scss';
import Button from "../../../components/Button";
import Plx from 'react-plx';

// import CatalogCard from "./CatalogCard";
import ShareOnSocials from "./ShareOnSocials";
import ArticlePartInfo from './ArticlePartInfo'
import InfoAboutPage from "./InfoAboutPage";
import IconCounter from '../../../img/icon-counter'
import IconHeart from '../../../img/icon-heart'

import pageBg from '../../../img/blog-open-bg.jpg';
import { likesArticle } from '../../../requests/likesArticle';

const ArticleInfo = ({ detail }) => {
  const [like, setLike] = useState(null)

  useEffect(() => {
    if (detail[0]) {
      setLike(detail[0].likes)
    }
  }, [])

  if (detail[0]) {
    const { id, views = 0, likes = 0, titleArticle, text, articlePart, photo = null } = detail[0];

    const handlerLikesClick = () => {
      if (likes === like) {
        setLike(like + 1)
        likesArticle(id)
      }
    }

    const pageBgStyles = {
      backgroundImage: 'url(' + pageBg + ')',
    };

    const parallaxData = [
      {
        start: 'self',
        end: '.end-parallax',

        properties: [
          {
            startValue: 1,
            endValue: 1.1,
            property: 'scale',
            freeze: true
          },
        ],
      },
    ];

    return (
      <section className="blog-open-content-section d-flex flex-column position-relative overflow-hidden">
        <Plx
          className='blog-open-bg-wrapper'
          parallaxData={parallaxData}>
          <div className="blog-open-bg h-100" style={pageBgStyles}></div>
        </Plx>

        <InfoAboutPage detail={detail} />

        <div className="content-container bg-color-white mx-auto">
          <div className="post-content text text-md">
            <h2 className="title title-lg">{titleArticle}</h2>
            <p className="text">{text}</p>
            <div className="post-img">
              <img src={photo} alt="" />
            </div>
            {articlePart.length ? articlePart.map(elem => {
              return <ArticlePartInfo key={elem.id} elem={elem} />
            }) : null}
            {/*//TODO! <CatalogCard cardImg={postImg} title={'Агиос'} desc={'Баня из клееного бруса'} link={''} />
            */}
          </div>
          <div className="bottom-info d-flex align-items-center">
            <Button
              onClick={() => handlerLikesClick()}
              className="rounded stroked transparent red-text red-border"
              icon={<IconHeart />}
              text={`Like ${like}`} />
            <div className="views-counter d-flex align-items-center">
              <IconCounter />
              <span className="text text-sm text-color-blackgray">{views}</span>
            </div>
            <ShareOnSocials className="ml-auto" />
          </div>
        </div>

        <div className="end-parallax"></div>
      </section>
    )
  } else {
    return <div>Извините, страница не найдена.</div>
  }

};

export default ArticleInfo;
