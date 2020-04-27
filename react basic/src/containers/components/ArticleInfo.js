import React from 'react';
import { Link } from 'react-router-dom';

import { viewArticle } from '../../requests/viewArticle';

const ArticleInfo = ({ elem, index }) => {
    const { title, id, titleArticle, photo } = elem;
    const maxIndex = 4;

    const handleClickView = () => {
        viewArticle(id)
    }

    if (index < maxIndex) {
        return (
            <div key={id} className="blog-item-wrapper">
                <article className="blog-item">
                    <Link onClick={() => handleClickView()}
                        to={{
                            pathname: `/blog/article/${id}`,
                            state: {
                                detail: elem,
                                photo
                            }
                        }}>
                        <div className="blog-item-img position-relative overflow-hidden">
                            <img src={photo} alt="" />
                        </div>
                    </Link>
                    <div className="item-info">
                        <h2 className="title title-md d-block">{title}</h2>
                        <span className="text desc d-block">{titleArticle}</span>
                        <Link onClick={() => handleClickView()} to={{
                            pathname: `/blog/article/${id}`,
                            state: {
                                detail: elem,
                                photo
                            }
                        }} className="text text-sm d-flex align-items-center">
                            Подробнее
                              <i className="icon d-flex">
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="#352929" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.789039 8.91097C1.03004 9.14595 1.41443 9.14595 1.65543 8.91097L4.93232 5.716C5.33485 5.32353 5.33485 4.67647 4.93232 4.284L1.65543 1.08904C1.41443 0.854061 1.03004 0.854061 0.789038 1.08904C0.539253 1.33258 0.539253 1.7341 0.789038 1.97764L3.8889 5L0.78904 8.02237C0.539254 8.26591 0.539254 8.66743 0.789039 8.91097Z" />
                                </svg>
                            </i>
                        </Link>
                    </div>
                </article>
            </div>)
    } else {
        return null;
    }
}

export default ArticleInfo;
