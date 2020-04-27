import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Plx from 'react-plx';

import "../../styles/plugins/slick.css";
import './ProductCardHOC.scss';
import Aside from './components/Aside';
import Header from "../../components/layout/header/Header";
import HouseFeatures from "./components/HouseFeatures";
import Gallery from './components/Gallery';
import ContentCard from './components/ContentCard';
import SingleContentElem from '../../components/catalog/catalog-categories/SingleContentElem';

import { default as $ } from "jquery";
import { default as slick } from "slick-carousel";
import { useBreakpoint } from "../../components/Breakpoints";

const ProductCardHOC = ({ elem, lastsProductCard }) => {
  let rootElement;
  const breakpoints = useBreakpoint();

  $.slick = slick;
  const slider = {
    main: null,
    nav: null,

    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      // initialSlide: 3,
      arrows: true,
      dots: true,
      speed: 1000,
      infinite: false,
      prevArrow: `
      <button type="button" class="slick-prev d-flex justify-content-center align-items-center">
        <div class="slick-arrow-circle d-flex justify-content-center align-items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.64767 12.5599L9.62766 17.5599C9.78766 17.7199 9.98767 17.7999 10.1877 17.7999C10.3877 17.7999 10.5877 17.7199 10.7477 17.5599C11.0677 17.2399 11.0677 16.7399 10.7477 16.4199L7.12766 12.7799H18.8077C19.2477 12.7799 19.6077 12.4199 19.6077 11.9799C19.6077 11.5399 19.2477 11.1799 18.8077 11.1799H7.12766L10.7477 7.53991C11.0677 7.21991 11.0677 6.71991 10.7477 6.39991C10.4277 6.07991 9.92766 6.07991 9.60767 6.39991L4.62766 11.3999C4.32766 11.7399 4.32767 12.2599 4.64767 12.5599Z" fill="white"/>
          </svg>
        </div>
      </button>
    `,
      nextArrow: `
      <button type="button" class="slick-next d-flex justify-content-center align-items-center">
        <div class="slick-arrow-circle d-flex justify-content-center align-items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.3652 12.5599L14.3852 17.5599C14.2252 17.7199 14.0251 17.7999 13.8251 17.7999C13.6251 17.7999 13.4251 17.7199 13.2652 17.5599C12.9451 17.2399 12.9451 16.7399 13.2652 16.4199L16.8852 12.7799H5.20515C4.76515 12.7799 4.40515 12.4199 4.40515 11.9799C4.40515 11.5399 4.76515 11.1799 5.20515 11.1799H16.8852L13.2652 7.53991C12.9451 7.21991 12.9451 6.71991 13.2652 6.39991C13.5851 6.07991 14.0852 6.07991 14.4052 6.39991L19.3852 11.3999C19.6852 11.7399 19.6852 12.2599 19.3652 12.5599Z" fill="white"/>
          </svg>
        </div>
      </button>
    `,
      asNavFor: '.product-card-slider-nav'
    },

    navSettings: {
      slidesToShow: 7,
      slidesToScroll: 1,
      speed: 1000,
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      // initialSlide: 3,
      infinite: false,
      asNavFor: '.product-card-slider'
    }
  };

  const [asideIsOpen, setAsideIsOpen] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isScrollDown, setScrollDown] = useState(false);

  const [isPhotoFiltered, setPhotoFiltered] = useState(true);
  const [isPlanningFiltered, setPlanningFiltered] = useState(false);
  const [isVideoFiltered, setVideoFiltered] = useState(false);

  const parallax = {
    slider: [
      {
        start: '10vh',
        end: '100%',
        properties: [
          {
            startValue: 1,
            endValue: 1.3,
            property: 'scale',
          },
        ],
      }
    ],

    aside: [
      {
        start: '5vh',
        end: '130vh',
        properties: [
          {
            startValue: 0,
            endValue: 100,
            unit: '%',
            property: 'translateX',
          },
        ],
      }
    ],

    scrollDown: [
      {
        start: '5vh',
        end: '100%',
        properties: [
          {
            startValue: 1,
            endValue: 1,
            property: 'scale',
          },
        ],
      }
    ],

    header: [
      {
        start: '100vh',
        end: '150vh',
        properties: [
          {
            startValue: 0,
            endValue: -50,
            property: 'translateY',
          },
          {
            startValue: 1,
            endValue: 0,
            property: 'opacity',
          }
        ],
      }
    ],

    bottomInfo: [
      {
        start: '1vh',
        end: '50vh',
        properties: [
          {
            startValue: 0,
            endValue: -50,
            property: 'translateY',
          },
          {
            startValue: 1,
            endValue: 0,
            property: 'opacity',
          }
        ],
      }
    ]
  };

  useEffect(() => {
    // Slider
    slider.settings.appendArrows = $('.product-card-slider-arrows');
    slider.settings.appendDots = $('.product-card-slider-dots');

    slider.main = $('.product-card-slider');
    slider.main.slick(slider.settings);
    slider.main.slick('slickFilter', (index, item) => {
      if (item.children[0].children[0].classList.contains('photo')) return item;
    });

    slider.nav = $('.product-card-slider-nav');
    slider.nav.slick(slider.navSettings);
    slider.nav.slick('slickFilter', (index, item) => {
      if (item.children[0].children[0].classList.contains('photo')) return item;
    });
  }, []);

  useEffect(() => {
    if (!rootElement) rootElement = document.querySelector('#root');

    if (isFullScreen) {
      setTimeout(() => {
        rootElement.style.overflow = 'hidden';
        rootElement.style.maxHeight = '100vh';
      }, 300);
    } else {
      setTimeout(() => {
        rootElement.style.overflow = 'initial';
        rootElement.style.maxHeight = 'initial';
      }, 300);
    }
  }, [isFullScreen]);

  const filterSliderCategory = (category, isQuickChange) => {
    // console.log(category)
    // console.log(isPhotoFiltered)
    if (category === 'photo') {
      // console.log(isQuickChange)

      if (isPhotoFiltered) return;

      setPhotoFiltered(true);
      setPlanningFiltered(false);
      setVideoFiltered(false);
    }

    if (category === 'planning') {
      // console.log(isPlanningFiltered)
      if (isPlanningFiltered) return;

      setPlanningFiltered(true);
      setPhotoFiltered(false);
      setVideoFiltered(false);
    }

    if (category === 'video') {

      if (isVideoFiltered) return;

      setVideoFiltered(true);
      setPhotoFiltered(false);
      setPlanningFiltered(false);
    }

    if (!slider.main) slider.main = $('.product-card-slider');
    if (!slider.nav) slider.nav = $('.product-card-slider-nav');

    const changeActiveClass = () => {
      let activeBtn = document.querySelector('.btn-top-info.active');
      if (activeBtn) activeBtn.classList.remove('active');
      document.querySelector(`.btn-top-info.${category}`).classList.add('active');
    };

    const filter = () => {
      changeActiveClass();
      slider.main.slick('slickGoTo', 0, true);
      slider.nav.slick('slickGoTo', 0, true);

      slider.main.slick('slickUnfilter');
      slider.nav.slick('slickUnfilter');

      slider.main.slick('slickFilter', (index, item) => {
        if (item.children[0].children[0].classList.contains(category)) return item;
      });
      slider.nav.slick('slickFilter', (index, item) => {
        if (item.children[0].children[0].classList.contains(category)) return item;
      });
    };

    if (isQuickChange) {
      filter();
      return;
    }

    setTimeout(() => {
      filter();
    }, 600);
  };

  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen);
    setAsideIsOpen(!asideIsOpen);
  };

  const toggleScrollDown = (state) => {
    setScrollDown(state);
    setFullScreen(false);
    setAsideIsOpen(true);
  };

  return (
    <>
      <Plx className='product-card-slider-wrapper' parallaxData={parallax.slider} disabled={breakpoints.xl}>
        <div className="product-card-slider">
          <Gallery elem={elem} />
        </div>
      </Plx>

      <section className="product-card-hero-section bg-color-darkbrown">
        <div className="product-card-hero-section-content d-flex flex-column flex-xl-row z-index-5">

          <div className="product-card-main-block d-flex flex-column position-relative flex-grow-1">
            <div className={`product-card-main-block-content d-flex flex-column position-relative flex-grow-1 ${isFullScreen ? 'fullscreen' : ''} ${isScrollDown ? 'scrolldown' : 'scrollup'}`}>

              <Plx className="header-wrapper" parallaxData={parallax.header} disabled={breakpoints.xl}>
                <Header theme={breakpoints.sm ? 'black' : 'white'} isCustomContainer={true} />
              </Plx>

              <div className="top-info d-flex justify-content-center">
                <nav>
                  <button
                    className="btn-top-info photo active"
                    onClick={() => filterSliderCategory('photo', true)}
                  >
                    <i className="btn-icon d-flex d-xl-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.71403 2.61743C1.34584 2.61743 1.04736 2.91591 1.04736 3.2841V16.7161C1.04736 17.0843 1.34584 17.3828 1.71403 17.3828H18.2861C18.6543 17.3828 18.9528 17.0843 18.9528 16.7161V3.2841C18.9528 2.91591 18.6543 2.61743 18.2861 2.61743H1.71403ZM2.3807 11.8877V3.95077H17.6195V11.8683L15.8546 10.3307C15.6051 10.1133 15.234 10.1118 14.9828 10.3272L12.4972 12.4577L7.51392 8.24108C7.26452 8.03005 6.89894 8.03084 6.65046 8.24295L2.3807 11.8877ZM15.4131 11.7144L17.6195 13.6367V16.0495H2.3807V13.6408L7.08519 9.62491L12.0693 13.8423C12.3191 14.0536 12.6854 14.0525 12.9338 13.8395L15.4131 11.7144ZM13.2641 7.05713C13.2641 6.65011 13.594 6.32015 14.0011 6.32015C14.4081 6.32015 14.738 6.65011 14.738 7.05713C14.738 7.46416 14.4081 7.79412 14.0011 7.79412C13.594 7.79412 13.2641 7.46416 13.2641 7.05713ZM14.0011 4.98682C12.8577 4.98682 11.9307 5.91373 11.9307 7.05713C11.9307 8.20054 12.8577 9.12745 14.0011 9.12745C15.1445 9.12745 16.0714 8.20054 16.0714 7.05713C16.0714 5.91373 15.1445 4.98682 14.0011 4.98682Z" fill="white" />
                      </svg>
                    </i>
                    <span className="d-none d-xl-block">{elem.img.length} Фотографий</span>
                  </button>
                  <button
                    className="btn-top-info planning"
                    onClick={() => filterSliderCategory('planning', true)}
                  >
                    <i className="btn-icon d-flex d-xl-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.04736 3.2841C1.04736 2.91591 1.34584 2.61743 1.71403 2.61743H4.76689C5.13508 2.61743 5.43356 2.91591 5.43356 3.2841V8.4301C5.43356 8.79829 5.13508 9.09677 4.76689 9.09677C4.3987 9.09677 4.10023 8.79829 4.10023 8.4301V3.95077H2.3807V16.0495H9.33341V10.4362C9.33341 10.068 9.63189 9.76953 10.0001 9.76953H13.4018C13.77 9.76953 14.0685 10.068 14.0685 10.4362C14.0685 10.8044 13.77 11.1029 13.4018 11.1029H10.6667V16.0495H17.6195V3.95077H9.30242C8.93423 3.95077 8.63575 3.65229 8.63575 3.2841C8.63575 2.91591 8.93423 2.61743 9.30242 2.61743H18.2861C18.6543 2.61743 18.9528 2.91591 18.9528 3.2841V16.7161C18.9528 17.0843 18.6543 17.3828 18.2861 17.3828H1.71403C1.34584 17.3828 1.04736 17.0843 1.04736 16.7161V3.2841Z" fill="white" />
                      </svg>
                    </i>
                    <span className="d-none d-xl-block">{elem.planning.length} Планировок</span>
                  </button>
                  <button
                    className="btn-top-info tour"
                  >
                    <i className="btn-icon d-flex d-xl-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.61278 8.44832C5.21445 8.44832 5.75278 8.60137 6.22778 8.90748C6.71334 9.20304 7.09334 9.60943 7.36778 10.1267C7.64222 10.6439 7.77945 11.2244 7.77945 11.8683C7.77945 12.6178 7.60528 13.2775 7.25695 13.8475C6.90861 14.4175 6.42834 14.8555 5.81611 15.1617C5.20389 15.4678 4.50195 15.6208 3.71028 15.6208C3.28806 15.6208 2.87639 15.5628 2.47528 15.4467C2.08472 15.3305 1.74695 15.1617 1.46195 14.94C1.17695 14.7817 1.03445 14.5653 1.03445 14.2908C1.03445 14.0903 1.10306 13.9055 1.24028 13.7367C1.38806 13.5678 1.56222 13.4833 1.76278 13.4833C1.95278 13.4833 2.14278 13.5519 2.33278 13.6892C2.76556 14.0903 3.30917 14.2908 3.96361 14.2908C4.37528 14.2908 4.75528 14.1958 5.10361 14.0058C5.4625 13.8158 5.7475 13.5467 5.95861 13.1983C6.16972 12.8394 6.27528 12.4278 6.27528 11.9633C6.27528 11.2772 6.06417 10.7494 5.64195 10.38C5.21972 10.0105 4.71306 9.82582 4.12195 9.82582C3.95306 9.82582 3.71028 9.86276 3.39361 9.93665C3.16139 9.99998 2.98722 10.0317 2.87111 10.0317C2.68111 10.0317 2.52806 9.96832 2.41195 9.84165C2.29584 9.70443 2.23778 9.53554 2.23778 9.33498C2.23778 9.21887 2.25889 9.1186 2.30111 9.03415C2.34334 8.94971 2.41195 8.84943 2.50695 8.73332L5.19861 5.77248H1.54111C1.34056 5.77248 1.17167 5.70387 1.03445 5.56665C0.897224 5.42943 0.828613 5.26054 0.828613 5.05998C0.828613 4.85943 0.897224 4.69582 1.03445 4.56915C1.17167 4.44248 1.34056 4.37915 1.54111 4.37915H6.59195C6.83472 4.37915 7.02472 4.45304 7.16195 4.60082C7.29917 4.74859 7.36778 4.92804 7.36778 5.13915C7.36778 5.32915 7.2675 5.52443 7.06695 5.72498L4.61278 8.44832Z" fill="white" />
                        <path d="M14.4846 4.37915C15.4768 4.37915 16.3266 4.62721 17.0338 5.12332C17.741 5.61943 18.2741 6.28971 18.6329 7.13415C18.9918 7.96804 19.1713 8.89693 19.1713 9.92082C19.1713 10.9553 18.9918 11.8947 18.6329 12.7392C18.2741 13.573 17.741 14.238 17.0338 14.7342C16.3266 15.2197 15.4768 15.4625 14.4846 15.4625H10.5896C10.3785 15.4625 10.1991 15.3886 10.0513 15.2408C9.90351 15.093 9.82962 14.9136 9.82962 14.7025V5.13915C9.82962 4.92804 9.90351 4.74859 10.0513 4.60082C10.1991 4.45304 10.3785 4.37915 10.5896 4.37915H14.4846ZM14.3263 14.0058C15.4029 14.0058 16.2105 13.6258 16.7488 12.8658C17.2871 12.0953 17.5563 11.1136 17.5563 9.92082C17.5563 8.7386 17.2818 7.76221 16.733 6.99165C16.1946 6.22109 15.3924 5.83582 14.3263 5.83582H11.3971V14.0058H14.3263Z" fill="white" />
                      </svg>
                    </i>
                    <span className="d-none d-xl-block">3D Тур</span>
                  </button>
                  <button
                    className="btn-top-info video"
                    onClick={() => filterSliderCategory('video', true)}
                  >
                    <i className="btn-icon d-flex d-xl-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.4585 10.0002C1.4585 5.28273 5.28273 1.4585 10.0002 1.4585C14.7176 1.4585 18.5418 5.28273 18.5418 10.0002C18.5418 14.7176 14.7176 18.5418 10.0002 18.5418C5.28273 18.5418 1.4585 14.7176 1.4585 10.0002ZM10.0002 0.208496C4.59237 0.208496 0.208496 4.59237 0.208496 10.0002C0.208496 15.408 4.59237 19.7918 10.0002 19.7918C15.408 19.7918 19.7918 15.408 19.7918 10.0002C19.7918 4.59237 15.408 0.208496 10.0002 0.208496ZM13.1507 10.6422C13.3441 10.5306 13.4632 10.3242 13.4632 10.1009C13.4632 9.87765 13.3441 9.67132 13.1507 9.55968L8.64589 6.95882C8.45252 6.84717 8.21427 6.84717 8.02089 6.95882C7.82752 7.07046 7.70839 7.27679 7.70839 7.50008V12.7018C7.70839 12.9251 7.82752 13.1314 8.02089 13.2431C8.21427 13.3547 8.45252 13.3547 8.64589 13.2431L13.1507 10.6422ZM8.95839 11.6193V8.58261L11.5882 10.1009L8.95839 11.6193Z" fill="white" />
                      </svg>
                    </i>
                    <span className="d-none d-xl-block">{elem.video.length} Видео</span>
                  </button>
                </nav>
              </div>

              <div className="product-card-slider-arrows">
                <button className="btn-exit-fullscreen d-none d-lg-flex justify-content-center align-items-center" onClick={toggleFullScreen}>
                  <div className="exit-fullscreen-circle d-flex justify-content-center align-items-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.7875 14.7167C16.0875 15.0167 16.0875 15.4834 15.7875 15.7834C15.6375 15.9334 15.4542 16 15.2542 16C15.0542 16 14.8708 15.9334 14.7208 15.7834L10.0042 11.0667L5.2875 15.7834C5.1375 15.9334 4.95417 16 4.75417 16C4.55417 16 4.37085 15.9334 4.22085 15.7834C3.92085 15.4834 3.92085 15.0167 4.22085 14.7167L8.9375 10L4.22085 5.28337C3.92085 4.98337 3.92085 4.5167 4.22085 4.2167C4.52085 3.9167 4.9875 3.9167 5.2875 4.2167L10.0042 8.93336L14.7208 4.2167C15.0209 3.9167 15.4875 3.9167 15.7875 4.2167C16.0875 4.5167 16.0875 4.98337 15.7875 5.28337L11.0708 10L15.7875 14.7167Z" fill="white" />
                    </svg>
                  </div>
                </button>
              </div>

              <div className="product-card-controls d-none d-xl-flex flex-column align-items-start mr-auto">
                <button className="product-card-btn" onClick={() => {
                  toggleFullScreen();
                  filterSliderCategory('photo', false);
                }}>
                  <i className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.71403 2.61743C1.34584 2.61743 1.04736 2.91591 1.04736 3.2841V16.7161C1.04736 17.0843 1.34584 17.3828 1.71403 17.3828H18.2861C18.6543 17.3828 18.9528 17.0843 18.9528 16.7161V3.2841C18.9528 2.91591 18.6543 2.61743 18.2861 2.61743H1.71403ZM2.3807 11.8877V3.95077H17.6195V11.8683L15.8546 10.3307C15.6051 10.1133 15.234 10.1118 14.9828 10.3272L12.4972 12.4577L7.51392 8.24108C7.26452 8.03005 6.89894 8.03084 6.65046 8.24295L2.3807 11.8877ZM15.4131 11.7144L17.6195 13.6367V16.0495H2.3807V13.6408L7.08519 9.62491L12.0693 13.8423C12.3191 14.0536 12.6854 14.0525 12.9338 13.8395L15.4131 11.7144ZM13.2641 7.05713C13.2641 6.65011 13.594 6.32015 14.0011 6.32015C14.4081 6.32015 14.738 6.65011 14.738 7.05713C14.738 7.46416 14.4081 7.79412 14.0011 7.79412C13.594 7.79412 13.2641 7.46416 13.2641 7.05713ZM14.0011 4.98682C12.8577 4.98682 11.9307 5.91373 11.9307 7.05713C11.9307 8.20054 12.8577 9.12745 14.0011 9.12745C15.1445 9.12745 16.0714 8.20054 16.0714 7.05713C16.0714 5.91373 15.1445 4.98682 14.0011 4.98682Z" fill="white" />
                    </svg>
                  </i>
                  <span className="btn-text">
                    <i>{elem.img.length} Фотографий</i>
                  </span>
                </button>
                <button className="product-card-btn" onClick={() => {
                  toggleFullScreen();
                  filterSliderCategory('planning', false);
                }}>
                  <i className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.04736 3.2841C1.04736 2.91591 1.34584 2.61743 1.71403 2.61743H4.76689C5.13508 2.61743 5.43356 2.91591 5.43356 3.2841V8.4301C5.43356 8.79829 5.13508 9.09677 4.76689 9.09677C4.3987 9.09677 4.10023 8.79829 4.10023 8.4301V3.95077H2.3807V16.0495H9.33341V10.4362C9.33341 10.068 9.63189 9.76953 10.0001 9.76953H13.4018C13.77 9.76953 14.0685 10.068 14.0685 10.4362C14.0685 10.8044 13.77 11.1029 13.4018 11.1029H10.6667V16.0495H17.6195V3.95077H9.30242C8.93423 3.95077 8.63575 3.65229 8.63575 3.2841C8.63575 2.91591 8.93423 2.61743 9.30242 2.61743H18.2861C18.6543 2.61743 18.9528 2.91591 18.9528 3.2841V16.7161C18.9528 17.0843 18.6543 17.3828 18.2861 17.3828H1.71403C1.34584 17.3828 1.04736 17.0843 1.04736 16.7161V3.2841Z" fill="white" />
                    </svg>
                  </i>
                  <span className="btn-text">
                    <i>{elem.planning.length} Планировки</i>
                  </span>
                </button>
                <button className="product-card-btn">
                  <i className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.61278 8.44832C5.21445 8.44832 5.75278 8.60137 6.22778 8.90748C6.71334 9.20304 7.09334 9.60943 7.36778 10.1267C7.64222 10.6439 7.77945 11.2244 7.77945 11.8683C7.77945 12.6178 7.60528 13.2775 7.25695 13.8475C6.90861 14.4175 6.42834 14.8555 5.81611 15.1617C5.20389 15.4678 4.50195 15.6208 3.71028 15.6208C3.28806 15.6208 2.87639 15.5628 2.47528 15.4467C2.08472 15.3305 1.74695 15.1617 1.46195 14.94C1.17695 14.7817 1.03445 14.5653 1.03445 14.2908C1.03445 14.0903 1.10306 13.9055 1.24028 13.7367C1.38806 13.5678 1.56222 13.4833 1.76278 13.4833C1.95278 13.4833 2.14278 13.5519 2.33278 13.6892C2.76556 14.0903 3.30917 14.2908 3.96361 14.2908C4.37528 14.2908 4.75528 14.1958 5.10361 14.0058C5.4625 13.8158 5.7475 13.5467 5.95861 13.1983C6.16972 12.8394 6.27528 12.4278 6.27528 11.9633C6.27528 11.2772 6.06417 10.7494 5.64195 10.38C5.21972 10.0105 4.71306 9.82582 4.12195 9.82582C3.95306 9.82582 3.71028 9.86276 3.39361 9.93665C3.16139 9.99998 2.98722 10.0317 2.87111 10.0317C2.68111 10.0317 2.52806 9.96832 2.41195 9.84165C2.29584 9.70443 2.23778 9.53554 2.23778 9.33498C2.23778 9.21887 2.25889 9.1186 2.30111 9.03415C2.34334 8.94971 2.41195 8.84943 2.50695 8.73332L5.19861 5.77248H1.54111C1.34056 5.77248 1.17167 5.70387 1.03445 5.56665C0.897224 5.42943 0.828613 5.26054 0.828613 5.05998C0.828613 4.85943 0.897224 4.69582 1.03445 4.56915C1.17167 4.44248 1.34056 4.37915 1.54111 4.37915H6.59195C6.83472 4.37915 7.02472 4.45304 7.16195 4.60082C7.29917 4.74859 7.36778 4.92804 7.36778 5.13915C7.36778 5.32915 7.2675 5.52443 7.06695 5.72498L4.61278 8.44832Z" fill="white" />
                      <path d="M14.4846 4.37915C15.4768 4.37915 16.3266 4.62721 17.0338 5.12332C17.741 5.61943 18.2741 6.28971 18.6329 7.13415C18.9918 7.96804 19.1713 8.89693 19.1713 9.92082C19.1713 10.9553 18.9918 11.8947 18.6329 12.7392C18.2741 13.573 17.741 14.238 17.0338 14.7342C16.3266 15.2197 15.4768 15.4625 14.4846 15.4625H10.5896C10.3785 15.4625 10.1991 15.3886 10.0513 15.2408C9.90351 15.093 9.82962 14.9136 9.82962 14.7025V5.13915C9.82962 4.92804 9.90351 4.74859 10.0513 4.60082C10.1991 4.45304 10.3785 4.37915 10.5896 4.37915H14.4846ZM14.3263 14.0058C15.4029 14.0058 16.2105 13.6258 16.7488 12.8658C17.2871 12.0953 17.5563 11.1136 17.5563 9.92082C17.5563 8.7386 17.2818 7.76221 16.733 6.99165C16.1946 6.22109 15.3924 5.83582 14.3263 5.83582H11.3971V14.0058H14.3263Z" fill="white" />
                    </svg>
                  </i>
                  <span className="btn-text">
                    <i>Тур</i>
                  </span>
                </button>
                <button className="product-card-btn" onClick={() => {
                  toggleFullScreen();
                  filterSliderCategory('video', false);
                }}>
                  <i className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.4585 10.0002C1.4585 5.28273 5.28273 1.4585 10.0002 1.4585C14.7176 1.4585 18.5418 5.28273 18.5418 10.0002C18.5418 14.7176 14.7176 18.5418 10.0002 18.5418C5.28273 18.5418 1.4585 14.7176 1.4585 10.0002ZM10.0002 0.208496C4.59237 0.208496 0.208496 4.59237 0.208496 10.0002C0.208496 15.408 4.59237 19.7918 10.0002 19.7918C15.408 19.7918 19.7918 15.408 19.7918 10.0002C19.7918 4.59237 15.408 0.208496 10.0002 0.208496ZM13.1507 10.6422C13.3441 10.5306 13.4632 10.3242 13.4632 10.1009C13.4632 9.87765 13.3441 9.67132 13.1507 9.55968L8.64589 6.95882C8.45252 6.84717 8.21427 6.84717 8.02089 6.95882C7.82752 7.07046 7.70839 7.27679 7.70839 7.50008V12.7018C7.70839 12.9251 7.82752 13.1314 8.02089 13.2431C8.21427 13.3547 8.45252 13.3547 8.64589 13.2431L13.1507 10.6422ZM8.95839 11.6193V8.58261L11.5882 10.1009L8.95839 11.6193Z" fill="white" />
                    </svg>
                  </i>
                  <span className="btn-text">
                    <i>{elem.video.length} Видео</i>
                  </span>
                </button>
              </div>

              <div className="product-card-slider-nav d-none d-xl-block mt-auto">
                <Gallery elem={elem} />
              </div>

              <div className="bottom-info-wrapper">
                <Plx className="bottom-info" parallaxData={parallax.bottomInfo} disabled={breakpoints.xl}>
                  <div className="product-card-slider-dots d-flex justify-content-center" />
                  <HouseFeatures className="mx-auto" />
                </Plx>
              </div>

            </div>
          </div>

          <Plx parallaxData={parallax.aside} className={''} disabled={breakpoints.xl}>
            <Aside elem={elem} asideIsOpen={asideIsOpen} />
          </Plx>

          <Plx
            parallaxData={parallax.scrollDown}
            className={'d-none'}
            onPlxStart={() => toggleScrollDown(true)}
            onPlxEnd={() => toggleScrollDown(false)}
            disabled={breakpoints.xl}
          />
        </div>
      </section>

      <ContentCard elem={elem} />
      
      <div className="last-product-cards text-color-white position-relative z-index-5">
        <div className="container d-flex flex-column flex-lg-row">
          {lastsProductCard.map((elem, index) => {
            return <SingleContentElem
              elem={elem}
              index={index + 1}
              key={index} />
          })}
        </div>
      </div>
    </>
  )
};

export default ProductCardHOC;
