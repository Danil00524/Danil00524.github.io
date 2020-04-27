import React from 'react';
import {Link} from 'react-router-dom';

const ArticlePreview = ({elem}) => {
  const {title, photo, id} = elem;

  return (
      <Link to={{
        pathname: `/blog/article/${id}`,
        state: {
          detail: elem,
          photo
        }
      }} className="article-preview d-flex">
        <div className="article-img overflow-hidden">
          <img src={photo} alt=""/>
        </div>
        <div className="article-title">
          <span className="title title-xs">{title}</span>
        </div>
      </Link>
  )
}

export default ArticlePreview;
