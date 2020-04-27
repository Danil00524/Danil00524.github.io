import React from 'react';

import { Link } from "react-router-dom";
import ArrowRight from '../../../img/arrow-right';

const SideBarBlogBlock = ({ article }) => {

  const { id, title, photo } = article;

  return (
    <Link to={{
      pathname: `/blog/article/${id}`,
      state: {
        detail: article,
        photo
      }
    }} className="aside-item-link item-mini">
      <article className="aside-item item-mini d-flex">
        <span className="item-img overflow-hidden flex-shrink-0">
          <img className="item-img overflow-hidden flex-shrink-0" src={photo} alt="" />
        </span>
        <div className="item-info d-flex flex-column">
          <h5 className="title title-xs">
            <span>{title}</span>
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

export default SideBarBlogBlock;
