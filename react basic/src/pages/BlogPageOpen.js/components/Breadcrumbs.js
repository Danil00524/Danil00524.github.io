import React from "react";

import { Link } from 'react-router-dom';

const Breadcrumbs = ({titleArticle}) => {
  return (
    <div className={`breadcrumbs d-flex align-items-center justify-content-center`}>
      <Link className="link" to={`/`}>Главная</Link>
      <span className="current-select d-flex align-items-center text-color-blackgray">
        <Link className="link" to={`/blog`}>Блог</Link>
      </span>
      <span className="current-select text text-md text-color-blackgray">
          {titleArticle}
      </span>
    </div>
  );
};

export default Breadcrumbs;
