import React from 'react';

import './InfoAboutPage.scss';
import Breadcrumbs from './Breadcrumbs';

const InfoAboutPage = ({detail}) => {
    const {type, title} = detail[0];

    return (
        <div className="blog-open-hero-section bg-color-white">
            <div className="container">
                <h5 className="title title-lg text-center">{type}</h5>
                <h5 className="title title-main text-center mx-auto">{title}</h5>
                <Breadcrumbs className="d-flex justify-content-center" titleArticle={title} />
            </div>
        </div>
    )
}

export default InfoAboutPage;
