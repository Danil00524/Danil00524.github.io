import React, {useState} from 'react';
import Popup from "reactjs-popup";

import './Footer.scss';
import NavBar from "../NavBar";
import MainLogo from "../MainLogo";
import ContactsBlock from "../../ContactsBlock";
import SocialsBlock from "../SocialsBlock";
import Button from "../../Button";

import useForm from "react-hook-form";
import SvgSet from "../../../img/SvgSet";
import {subscribeNews} from '../../../requests/subscribeNews';

const Footer = ({className}) => {
  const {register, handleSubmit} = useForm('');
  const [status, setStatus] = useState(false);
  const [stateClick, setStateClick] = useState(false);
  
  const handlerClick = () => {
    if (!stateClick) {
      return;
    }
    setStateClick(!stateClick);
  };
  
  const onSubmit = async (data, e) => {
    e.preventDefault();
    e.target.reset()
    
    setStateClick(true);
    let request = await subscribeNews(data)
    
    if (request) {
      setStatus(request.ok)
    }
  };
  
  const popup =
    <Popup
      open={stateClick}
      closeOnDocumentClick
      contentStyle={{maxWidth: '480px'}}
      onClose={() => handlerClick()}>
      <div className="modal d-flex flex-column align-items-center text-center">
        <button className="close d-flex ml-auto" onClick={handlerClick}>
          <svg className="close-icon" width="14" height="13" viewBox="0 0 14 13" fill="#C4C0C0"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.7877 11.7167C13.0877 12.0167 13.0877 12.4834 12.7877 12.7834C12.6377 12.9334 12.4544 13 12.2544 13C12.0544 13 11.8711 12.9334 11.7211 12.7834L7.00442 8.0667L2.28774 12.7834C2.13774 12.9334 1.95442 13 1.75442 13C1.55442 13 1.37109 12.9334 1.22109 12.7834C0.921094 12.4834 0.921094 12.0167 1.22109 11.7167L5.93775 7.00003L1.22109 2.28337C0.921094 1.98337 0.921094 1.5167 1.22109 1.2167C1.52109 0.916699 1.98774 0.916699 2.28774 1.2167L7.00442 5.93336L11.7211 1.2167C12.0211 0.916699 12.4877 0.916699 12.7877 1.2167C13.0877 1.5167 13.0877 1.98337 12.7877 2.28337L8.07107 7.00003L12.7877 11.7167Z"
              fill=""/>
          </svg>
        </button>
        <div className="icon">
          <SvgSet icon="complete"/>
        </div>
        <div className="title title-md text-color-blackgray">
          Спасибо! Данные успешно отправлены.
        </div>
        <div className="text text-sm text-color-blackgray">
          Через 24 часа Ваша почта будет добавлена в базу.
        </div>
      </div>
    </Popup>;
  
  return (
    <footer className={`footer text-color-white bg-color-darkbrown ${(className || '')}`}>
      <div className="footer-top">
        <div className="container">
          <div className="row flex-column flex-md-row">
            <div className="col-12 col-md-7 col-lg-5">
              <div className="subscribe d-flex flex-column">
                <span className="title title-lg">Подписаться</span>
                <p className="subscribe-text">Подписывайся на наши новости и узнавай первым о
                  специальных предложениях</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="form-group d-flex flex-column align-items-start">
                  <label htmlFor="footer-email" className="text text-xs">Email</label>
                  <input
                    name="email"
                    required
                    ref={register}
                    type="email"
                    id="footer-email"
                    className="form-control line-type"/>
                  <Button type='submit' className={'rounded stroked transparent'} text={'Подписаться'}/>
                </form>
                {status ? popup : null}
              </div>
            </div>
            <div className="col d-flex justify-content-center mobile-dn">
              <div className="navigation d-flex justify-content-center">
                <div className="d-flex flex-column">
                  <span className="title title-lg">Навигация</span>
                  <NavBar/>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="contacts d-flex justify-content-end">
                <div className="contact-holder d-flex flex-column">
                  <ContactsBlock titleSize='lg' />
                  <SocialsBlock />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom d-none d-md-block">
        <div className="container d-flex align-items-center">
          <MainLogo/>
          <span className="copyrights ml-auto">© 2019 Woodland. Данный сайт защищен от копирования.</span>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
