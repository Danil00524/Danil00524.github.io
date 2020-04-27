import React from 'react';

import './InfoAboutPage.scss';
import Breadcrumbs from '../../../components/Breadcrumbs';

const InfoAboutPage = () => {
    return (
        <section className="blog-page-hero-section">
            <div className="container">
                <h5 className="title title-lg text-center">Блог</h5>
                <h5 className="title title-main text-center mx-auto">Здесь мы рассказываем все о нашей жизни</h5>
                <Breadcrumbs className="d-flex justify-content-center" link={window.location.pathname} />
            </div>
        </section>
    )
}

export default InfoAboutPage;
