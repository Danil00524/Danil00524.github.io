import React from "react";

import { Link } from 'react-router-dom';
import './scss/Breadcrumbs.scss';

const Breadcrumbs = ({ link, className }) => {
  const routes = [
    { path: '/about-us', breadcrumbs: 'О компании' },
    { path: '/services', breadcrumbs: 'Услуги' },
    { path: '/catalog', breadcrumbs: 'Проекты' },
    { path: '/blog', breadcrumbs: 'Блог' },
    { path: '/contacts', breadcrumbs: 'Контакты' }
  ];

  const currentLink = routes.filter(route => route.path == link);

  return (
    <div className={`breadcrumbs d-flex align-items-center mobile-dn ${(className || '')}`}>
      <Link className="link" to={`/`}>Главная</Link>
      <span className="current-select text text-md text-color-blackgray">
        {currentLink[0].breadcrumbs}
      </span>
    </div>
  );
};

export default Breadcrumbs;
