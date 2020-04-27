import React from 'react';

import { Link } from 'react-router-dom';
import './SingleItem.scss';
import Button from "../../../components/Button";
import SingleItemFullInfo from "./SingleItemFullInfo";
import { SideBarConsumer } from "../../../components/SideBarContext";

const SingleItem = ({ elem }) => {
  const { id, description, name, price, photo } = elem;

  return (
    <div className="service-item d-flex">
      <div className="item-content d-flex text-color-darkbrown bg-color-white overflow-hidden position-relative">
        <div className="item-info d-flex flex-column">
          <div className="info-top">
            <div className="info-title d-flex justify-content-between align-items-center">
              <h3 className="title title-xl">{name}</h3>
              <img src={photo} alt='img' />
            </div>
            <span className="text text-md">{description}</span>
          </div>
          <div className="info-bottom d-flex justify-content-between align-items-end mt-auto">
            <div className="d-flex flex-column align-items-start">
              <span className="text-color-blackgray">Стоимость</span>
              <span className="title title-lg">от {price} &#8381;</span>

              <SideBarConsumer>
                {sidebarState => {
                  return (
                    <button className="link" onClick={() => {
                      sidebarState.setSidebarIsOpen(!sidebarState.sidebarIsOpen);
                      sidebarState.setSidebarContent(<SingleItemFullInfo elem={elem} sidebarState={sidebarState} />);
                    }}>
                      Что входит в цену?
                    </button>
                  );
                }}
              </SideBarConsumer>

            </div>
            <Link to={{
              pathname: "/contacts",
              state: {
                serviceId: id,
              }
            }}>
              <Button className="rounded stroked transparent black-text" text={'Заказать'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SingleItem;
