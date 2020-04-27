import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';

import './Aside.scss'
import Button from "../../../components/Button";
import SvgSet from "../../../img/SvgSet";
import TurnkeyCostInfo from "./TurnkeyCostInfo";
import LogCostInfo from "./LogCostInfo";
import {useBreakpoint} from "../../../components/Breakpoints";
import ContentCardAside from "./ContentCardAside";

const Aside = ({elem, asideIsOpen}) => {
  const breakpoints = useBreakpoint();
  let rootElement;
  
  const {
    id, description, floors = '-', metres, name, fullDescription,
    wallMaterial, technology, gusset, turnkeyCost, logCost
  } = elem;
  
  const [isOverflowHidden, setOverflowHidden] = useState(false);
  const [isTurnkeyCostShow, setTurnkeyCostShow] = useState(false);
  const [isLogCostShow, setLogCostShow] = useState(false);
  const [isContentCardShow, setContentCardShow] = useState(false);
  
  const [isShowNextTab, setShowNextTab] = useState(false);
  
  const setAsideCompact = () => {
    setTurnkeyCostShow(false);
    setLogCostShow(false);
    setContentCardShow(false);
  };
  
  const handleOverflow = (state) => {
    if (breakpoints.xl) {
      setOverflowHidden(state);
    }
  };
  
  const handleNextTab = (e) => {
    if (e.currentTarget.classList.contains('active')) return;
    
    document.querySelector('.content-tabs .content-tab.active').classList.remove('active');
    e.currentTarget.classList.add('active');
    if (e.currentTarget.textContent === 'Сруб') setShowNextTab(true);
    else setShowNextTab(false);
  };
  
  useEffect(() => {
    if (!rootElement) rootElement = document.querySelector('#root');
    
    if (isOverflowHidden) {
        rootElement.style.overflow = 'hidden';
        rootElement.style.maxHeight = '100vh';
    } else {
        rootElement.style.overflow = 'initial';
        rootElement.style.maxHeight = 'initial';
    }
  }, [isOverflowHidden]);
  
  return (
    <>
      <aside
        className={'product-card-aside position-relative d-flex flex-column flex-shrink-0 bg-color-white overflow-hidden h-100 ' +
        `${asideIsOpen ? '' : 'closed'} ${isTurnkeyCostShow || isLogCostShow ? 'expanded' : ''}`}
      >
        
        <div className="product-card-aside-content flex-grow-1">
          
          <div className={`turnkey-cost-content-wrapper ${isTurnkeyCostShow ? 'show' : 'hide'}`}>
            <div className="mobile-title d-flex d-xl-none align-items-center">
              <h2 className="title title-xxl mr-auto">{elem.name}</h2>
              <span className="title title-sm d-none d-md-block">{elem.turnkeyCost} &#8381;</span>
              <Link className="leave-a-request d-none d-md-block" to={{
                pathname: "/contacts",
                state: {
                  houseId: id
                }
              }}>
                <Button className="rounded mx-auto" text={'Оставить заявку'}/>
              </Link>
              <button className="d-flex" onClick={() => {setAsideCompact()}}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.7" cx="22" cy="22" r="22" fill="black" />
                  <path d="M27.7877 26.7167C28.0877 27.0167 28.0877 27.4834 27.7877 27.7834C27.6377 27.9334 27.4544 28 27.2544 28C27.0544 28 26.8711 27.9334 26.7211 27.7834L22.0044 23.0667L17.2877 27.7834C17.1377 27.9334 16.9544 28 16.7544 28C16.5544 28 16.3711 27.9334 16.2211 27.7834C15.9211 27.4834 15.9211 27.0167 16.2211 26.7167L20.9377 22L16.2211 17.2834C15.9211 16.9834 15.9211 16.5167 16.2211 16.2167C16.5211 15.9167 16.9877 15.9167 17.2877 16.2167L22.0044 20.9334L26.7211 16.2167C27.0211 15.9167 27.4877 15.9167 27.7877 16.2167C28.0877 16.5167 28.0877 16.9834 27.7877 17.2834L23.0711 22L27.7877 26.7167Z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="turnkey-cost-content">
              <TurnkeyCostInfo elem={elem} setAsideCompact={setAsideCompact} handleOverflow={handleOverflow}/>
            </div>
          </div>
          
          <div className={`log-cost-content-wrapper ${isLogCostShow ? 'show' : 'hide'}`}>
            <div className="mobile-title d-flex d-xl-none align-items-center">
              <h2 className="title title-xxl mr-auto">{elem.name}</h2>
              <span className="title title-sm d-none d-md-block">{elem.logCost} &#8381;</span>
              <Link className="leave-a-request d-none d-md-block" to={{
                pathname: "/contacts",
                state: {
                  houseId: id
                }
              }}>
                <Button className="rounded mx-auto" text={'Оставить заявку'}/>
              </Link>
              <button className="d-flex" onClick={() => {setAsideCompact()}}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.7" cx="22" cy="22" r="22" fill="black" />
                  <path d="M27.7877 26.7167C28.0877 27.0167 28.0877 27.4834 27.7877 27.7834C27.6377 27.9334 27.4544 28 27.2544 28C27.0544 28 26.8711 27.9334 26.7211 27.7834L22.0044 23.0667L17.2877 27.7834C17.1377 27.9334 16.9544 28 16.7544 28C16.5544 28 16.3711 27.9334 16.2211 27.7834C15.9211 27.4834 15.9211 27.0167 16.2211 26.7167L20.9377 22L16.2211 17.2834C15.9211 16.9834 15.9211 16.5167 16.2211 16.2167C16.5211 15.9167 16.9877 15.9167 17.2877 16.2167L22.0044 20.9334L26.7211 16.2167C27.0211 15.9167 27.4877 15.9167 27.7877 16.2167C28.0877 16.5167 28.0877 16.9834 27.7877 17.2834L23.0711 22L27.7877 26.7167Z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="log-cost-content">
              <LogCostInfo elem={elem} setAsideCompact={setAsideCompact}/>
            </div>
          </div>
  
          <div className={`content-card-wrapper ${isContentCardShow ? 'show' : 'hide'}`}>
            <div className="mobile-title d-flex d-xl-none align-items-center">
              <nav className="content-tabs d-flex h-100 title title-lg mr-auto">
                <button className="content-tab active" onClick={handleNextTab}>Под ключ</button>
                <button className="content-tab" onClick={handleNextTab}>Сруб</button>
              </nav>

              <span className="title title-sm d-none d-md-block">{!isShowNextTab ? elem.turnkeyCost : elem.logCost} &#8381;</span>
              <Link className="leave-a-request d-none d-md-block" to={{
                pathname: "/contacts",
                state: {
                  houseId: id
                }
              }}>
                <Button className="rounded mx-auto" text={'Оставить заявку'}/>
              </Link>
              <button className="d-flex" onClick={() => {setAsideCompact()}}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.7" cx="22" cy="22" r="22" fill="black" />
                  <path d="M27.7877 26.7167C28.0877 27.0167 28.0877 27.4834 27.7877 27.7834C27.6377 27.9334 27.4544 28 27.2544 28C27.0544 28 26.8711 27.9334 26.7211 27.7834L22.0044 23.0667L17.2877 27.7834C17.1377 27.9334 16.9544 28 16.7544 28C16.5544 28 16.3711 27.9334 16.2211 27.7834C15.9211 27.4834 15.9211 27.0167 16.2211 26.7167L20.9377 22L16.2211 17.2834C15.9211 16.9834 15.9211 16.5167 16.2211 16.2167C16.5211 15.9167 16.9877 15.9167 17.2877 16.2167L22.0044 20.9334L26.7211 16.2167C27.0211 15.9167 27.4877 15.9167 27.7877 16.2167C28.0877 16.5167 28.0877 16.9834 27.7877 17.2834L23.0711 22L27.7877 26.7167Z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="content-card-content">
              <ContentCardAside elem={elem} setAsideCompact={setAsideCompact} isShowNextTab={isShowNextTab}/>
            </div>
          </div>
          
          <div className={`default-content-wrapper-outer ${!isTurnkeyCostShow && !isLogCostShow ? 'show' : 'hide'}`}>
            <div className="default-content-wrapper-inner">
              <div className="default-content">
                <div className="d-flex justify-content-between align-items-center mb-24px">
                  <div>
                    <h1 className="title title-lg">{name}</h1>
                    <span className="text text-md">{description}</span>
                  </div>
                  <div className="d-none d-md-flex flex-row-reverse align-items-center d-xl-none">
                    <Link to={{
                      pathname: "/contacts",
                      state: {
                        houseId: id
                      }
                    }}>
                      <Button className="rounded mx-auto" text={'Оставить заявку'}/>
                    </Link>
                    <Button className="share-btn rounded stroked transparent circle mr-12px" text={<SvgSet icon="share"/>} />
                  </div>
                </div>
                
                <div className="details mb-24px d-flex justify-content-start justify-content-xl-between">
                  <div className="d-flex flex-column">
                    <span className="feature-title text-color-blackgray">Площадь строения:</span>
                    <span className="title title-sm">{metres} м2</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="feature-title text-color-blackgray">Этажей:</span>
                    <span className="title title-sm">{floors}</span>
                  </div>
                </div>
                
                <div className="mb-24px d-flex flex-column">
                  <span className="feature-title text-color-blackgray">Стеновой материал</span>
                  <span className="title title-sm">{wallMaterial}</span>
                </div>
                
                <div className="mb-24px d-flex flex-column">
                  <span className="feature-title text-color-blackgray">Технология</span>
                  <span className="title title-sm">{technology}</span>
                </div>
                
                <div className="mb-24px d-flex flex-column">
                  <span className="feature-title text-color-blackgray">Угловое соединение</span>
                  <span className="title title-sm">{gusset}</span>
                </div>
                
                <div className="details mb-32px d-flex justify-content-start justify-content-xl-between">
                  <div className="d-flex flex-column align-items-start">
                    <span className="feature-title text-color-blackgray">Под ключ</span>
                    <span className="title title-sm">{turnkeyCost} &#8381;</span>
                    
                    <button className="link" onClick={() => {
                        setTurnkeyCostShow(true);
                        // handleOverflow(true);
                      }
                    }>
                      Что входит в цену?
                    </button>
                  </div>
                  
                  <div className="d-flex flex-column align-items-start">
                    <span className="feature-title text-color-blackgray">Сруб</span>
                    <span className="title title-sm">{logCost} &#8381;</span>
                    
                    <button className="link" onClick={() => setLogCostShow(true)}>
                      Что входит в цену?
                    </button>
                  </div>
                </div>
                
                <div className="description">
                  <span className="title title-sm d-block">Описание проекта:</span>
                  <p>{fullDescription} {description}</p>
                </div>
  
                <Button
                  className="btn-read-more rounded stroked transparent black-text d-block d-xl-none"
                  text="Читать полное описание"
                  onClick={() => setContentCardShow(true)}
                />
              </div>
            </div>
            <div className="product-card-aside-actions d-flex d-md-none d-xl-flex justify-content-start align-items-center w-100">
              <Link to={{
                pathname: "/contacts",
                state: {
                  houseId: id
                }
              }}>
                <Button className="rounded mx-auto" text={'Оставить заявку'}/>
              </Link>
              <Button className="share-btn rounded stroked transparent circle" text={<SvgSet icon="share"/>} />
            </div>
          </div>
        
        </div>
      
      </aside>
    </>
  )
};

export default Aside;
