import React from 'react'
import Button from "../../../components/Button";

import { Link } from 'react-router-dom';

const TurnkeyCostInfo = ({ elem, setAsideCompact, handleOverflow }) => {
  const { id, bedroom = `-`, description, floors = `-`, metres, name, turnkeyCost, guarantee } = elem;

  return (
    <>
      <div className="service-item-full-info">
        <div className="sidebar-title d-none d-xl-flex justify-content-between align-items-center">
          <h2 className="title title-xxl">{name}</h2>
          <button onClick={() => {setAsideCompact()}}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.7" cx="22" cy="22" r="22" fill="black" />
              <path d="M27.7877 26.7167C28.0877 27.0167 28.0877 27.4834 27.7877 27.7834C27.6377 27.9334 27.4544 28 27.2544 28C27.0544 28 26.8711 27.9334 26.7211 27.7834L22.0044 23.0667L17.2877 27.7834C17.1377 27.9334 16.9544 28 16.7544 28C16.5544 28 16.3711 27.9334 16.2211 27.7834C15.9211 27.4834 15.9211 27.0167 16.2211 26.7167L20.9377 22L16.2211 17.2834C15.9211 16.9834 15.9211 16.5167 16.2211 16.2167C16.5211 15.9167 16.9877 15.9167 17.2877 16.2167L22.0044 20.9334L26.7211 16.2167C27.0211 15.9167 27.4877 15.9167 27.7877 16.2167C28.0877 16.5167 28.0877 16.9834 27.7877 17.2834L23.0711 22L27.7877 26.7167Z" fill="white" />
            </svg>
          </button>
        </div>

        <ul className="item-details d-flex justify-content-between flex-wrap flex-xxl-nowrap">
          <li className="d-flex flex-column">
            <span className="text-color-blackgray">Площадь строения</span>
            <span className="title title-sm">{metres} м2</span>
          </li>
          <li className="d-flex flex-column">
            <span className="text-color-blackgray">Этажей</span>
            <span className="title title-sm">{floors}</span>
          </li>
          <li className="d-flex flex-column">
            <span className="text-color-blackgray">Комнаты</span>
            <span className="title title-sm">{bedroom}</span>
          </li>
          <li className="d-flex flex-column">
            <span className="text-color-blackgray">Гарантия</span>
            <span className="title title-sm">{guarantee} лет</span>
          </li>
          <li className="d-flex flex-column">
            <span className="text-color-blackgray">Цена</span>
            <span className="title title-sm">{turnkeyCost} &#8381;</span>
          </li>
        </ul>

        <div className="item-info">{description}</div>

        <div className="item-list type-included">
          <h3 className="title title-lg">В стоимость включено:</h3>

          <ul className="list">
            <li className="list-item">
              <h4 className="title title-md">Рабочий проект</h4>
              <span className="text-color-blackgray">Разработка рабочего проекта - конструкции деревянные</span>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Материал извтовления сруба</h4>
              <p className="text-color-blackgray">Заготовка леса в период с ноября по март. Регионы заготовки: Сосна: Кировская область.
                Кедр: Красноярск, Алтай
                Транспортировка леса на производственную площадку Smart Wood в Подмосковье
                Изготовление и транспортировка на производственную площадку Smart Wood в Подмосковье, клееного или строганного бруса для объвязки по периметру строения
                  Окорка, острожка и антисептирование леса с последующим складированием на производственной площадке Smart Wood в Подмосковье</p>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Изтовление сруба</h4>
              <p className="text-color-blackgray">Заготовка леса в период с ноября по март. Регионы заготовки: Сосна: Кировская область.
                Кедр: Красноярск, Алтай
                Транспортировка леса на производственную площадку Smart Wood в Подмосковье
                Изготовление и транспортировка на производственную площадку Smart Wood в Подмосковье, клееного или строганного бруса для объвязки по периметру строения
                  Окорка, острожка и антисептирование леса с последующим складированием на производственной площадке Smart Wood в Подмосковье</p>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Транспортировка сруба</h4>
              <p className="text-color-blackgray">Транспортировка сруба в закрытых автомобилях в пределах Московской области </p>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Монтаж сруба</h4>
              <p className="text-color-blackgray">Аренда машин и механизмов для монтажа сруба на месте застройки
                Монтаж сруба на фундаменте Заказчика в пределах Московской области с прокладкой гидроизоляции на фундаменте и утеплителя между венцами
                  Уборка площадки</p>
            </li>
          </ul>
        </div>

        <div className="item-list type-excluded">
          <h3 className="title title-lg">В стоимость не включено:</h3>

          <ul className="list">
            <li className="list-item">
              <h4 className="title title-md">Ландшафтные работы</h4>
              <span className="text-color-blackgray">Разработка ландшафта - конструкции деревянные</span>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Сервисное обслуживание</h4>
              <span className="text-color-blackgray">Сервисное обслуживание - конструкции деревянные</span>
            </li>
            <li className="list-item">
              <h4 className="title title-md">Комплектация</h4>
              <span className="text-color-blackgray">Комплектация - конструкции деревянные</span>
            </li>
          </ul>
        </div>

        <div className="item-action d-flex flex-column align-items-start">
          <h3 className="title title-lg">Хотите заказать проект?</h3>
          <span className="text text-color-lightbrown">Оставьте заявку нам, и мы ответим в течении 24 часов</span>
          <Link to={{
            pathname: "/contacts",
            state: {
              houseId: id
            }
          }}>
            <Button className="rounded" text={'Заказать проект'} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default TurnkeyCostInfo;
