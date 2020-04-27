import React from 'react'
import { Link } from 'react-router-dom';

import ArrowRight from '../../../img/arrow-right';
import { viewArticle } from '../../../requests/viewArticle';

import './ArticleInfo.scss'

const ArticleInfo = ({ elem }) => {
    const { type, title, titleArticle, id, photo } = elem;

    const handlerViewClick = () => {
        viewArticle(id)
    }

    return (
        <>
            <div key={id} className="blog-item-wrapper">
                <article className="blog-item ">
                    <div className="blog-item-img position-relative overflow-hidden">
                        <Link
                            onClick={() => handlerViewClick()}
                            to={{
                                pathname: `/blog/article/${id}`,
                                state: {
                                    detail: elem,
                                    photo
                                }
                            }}>
                            <img src={photo} alt="" />
                        </Link>
                        <span className="badge text-color-white position-absolute">{type}</span>
                    </div>
                    <div className="item-info">
                        <span href="#" className="title title-md d-block">{title}</span>
                        <span className="text desc d-block">{titleArticle}</span>
                        <Link
                            onClick={() => handlerViewClick()}
                            to={{
                                pathname: `/blog/article/${id}`,
                                state: {
                                    detail: elem,
                                    photo
                                }
                            }} className="text text-sm d-flex align-items-center">
                            Подробнее
                            <i className="icon d-flex">
                                <ArrowRight />
                            </i>
                        </Link>
                    </div>
                </article>
            </div>
        </>
    )
};

export default ArticleInfo;
