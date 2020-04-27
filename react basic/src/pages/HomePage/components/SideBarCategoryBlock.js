import React from 'react';
import { Link } from "react-router-dom";
import ArrowRight from '../../../img/arrow-right'

const SideBarCategoryBlock = ({ elem }) => {

  const { imgPath, title, href, contentType } = elem;

  return (
    <Link to={{
      pathname: href,
      state: contentType
      }} className="aside-item-link">
      <article className="aside-item d-flex">
        <span className="item-img overflow-hidden flex-shrink-0">
          <img src={imgPath} alt='' />
        </span>
        <div className="item-info d-flex flex-column">
          <h5 className="title title-md">
            {title}
          </h5>
          <span className="text text-sm d-flex align-items-center">
            Подробнее
            <i className="icon d-flex">
              <ArrowRight />
            </i>
          </span>
        </div>
      </article>
    </Link>
  )
};

export default SideBarCategoryBlock;
