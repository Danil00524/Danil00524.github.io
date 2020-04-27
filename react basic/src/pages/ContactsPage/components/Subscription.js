import React, { useState } from "react";
import Popup from "reactjs-popup";
import useForm from "react-hook-form";

import './Subscription.scss';

import Button from "../../../components/Button";
import Breadcrumbs from "../../../components/Breadcrumbs";

import { contactsRequest } from '../../../requests/contactsRequest';
import SvgSet from "../../../img/SvgSet";

const Subscription = ({ houseId }) => {
  const { register, handleSubmit } = useForm('');
  const [status, setStatus] = useState(false);
  const [stateClick, setStateClick] = useState(false);

  const handlerClick = () => {
    if (!stateClick) {
      return;
    }
    setStateClick(!stateClick);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault()

    e.target.reset();
    setStateClick(true);

    if (!houseId) {
      data.project = '';
    } else if (houseId.houseId) {
      data.project = `https://wood.pd.dp.ua/product-card/${houseId.houseId}`;
    } else if (houseId.serviceId) {
      data.project = `https://wood.pd.dp.ua/services/${houseId.serviceId}`;
    } else {
      console.error('House id is not defined.')
    }

    let request = await contactsRequest(data)
    if (request) {
      setStatus(request.ok)
    }
  };

  const popup =
    <Popup
      open={stateClick}
      closeOnDocumentClick
      contentStyle={{ maxWidth: '480px' }}
      onClose={() => handlerClick()}>
      <div className="modal d-flex flex-column align-items-center text-center">
        <button className="close d-flex ml-auto" onClick={handlerClick}>
          <svg className="close-icon" width="14" height="13" viewBox="0 0 14 13" fill="#C4C0C0" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7877 11.7167C13.0877 12.0167 13.0877 12.4834 12.7877 12.7834C12.6377 12.9334 12.4544 13 12.2544 13C12.0544 13 11.8711 12.9334 11.7211 12.7834L7.00442 8.0667L2.28774 12.7834C2.13774 12.9334 1.95442 13 1.75442 13C1.55442 13 1.37109 12.9334 1.22109 12.7834C0.921094 12.4834 0.921094 12.0167 1.22109 11.7167L5.93775 7.00003L1.22109 2.28337C0.921094 1.98337 0.921094 1.5167 1.22109 1.2167C1.52109 0.916699 1.98774 0.916699 2.28774 1.2167L7.00442 5.93336L11.7211 1.2167C12.0211 0.916699 12.4877 0.916699 12.7877 1.2167C13.0877 1.5167 13.0877 1.98337 12.7877 2.28337L8.07107 7.00003L12.7877 11.7167Z" fill="" />
          </svg>
        </button>
        <div className="icon">
          <SvgSet icon="complete" />
        </div>
        <h3 className="title title-md">
          Данные успешно отправлены
        </h3>
        <span className="text text-sm text-color-blackgray">
          Спасибо за обращение. Наш администратор свяжется с вами в ближайшее время
        </span>
      </div>
    </Popup>;

  return (
    <div className="subscription-section">
      <div className="container">
        <h5 className="title title-lg text-center">Контакты</h5>
        <h5 className="title title-main text-center mx-auto">Здесь мы отвечаем на все ваши вопросы</h5>
        <Breadcrumbs className="d-flex justify-content-center" link={window.location.pathname} />

        <form className="subscription-form d-flex flex-column mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group d-flex">
            <div className="input-group d-flex flex-column w-50">
              <label htmlFor="firstName" className="text text-xs text-color-blackgray z-index-1">Ваше имя</label>
              <input name="name"
                required
                placeholder="Александр"
                ref={register}
                className="z-index-1" />
              <div className="group-bg"></div>
            </div>

            <div className="input-group d-flex flex-column w-50">
              <label htmlFor="email" className="text text-xs text-color-blackgray z-index-1">Ваш e-mail</label>
              <input name="email"
                required
                placeholder="max.hoffman@example.com"
                type="email"
                ref={register}
                className="z-index-1" />
              <div className="group-bg"></div>
            </div>
          </div>
          <div className="textarea-group d-flex flex-column">
            <label htmlFor="message" className="text text-xs text-color-blackgray z-index-1">Текст сообщения</label>
            <textarea name="text"
              placeholder="Добрый день. Мне нужна ваша консультация!"
              ref={register}
              className="z-index-1"></textarea>
            <div className="group-bg"></div>
          </div>
          <Button className="rounded mx-auto" text={'Отправить'} type="submit" />
        </form>
        {status ? popup : null}
      </div>
    </div>
  );
};

export default Subscription;
