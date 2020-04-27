import React from "react";
import { Link } from 'react-router-dom';

import SocialIcon1 from '../../../img/SocialIcon-1.svg';
import SocialIcon2 from '../../../img/SocialIcon-2.svg';
import SocialIcon3 from '../../../img/SocialIcon-3.svg';

import GoogleMapReact from 'google-map-react';
import './Map.scss';

import './Map.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {

    const YOUR_API_KEY = '';

    const center = {
        lat: 59.95,
        lng: 30.33
    };
    const zoom = 11;

    return (
        <div className='contacts-map'>
            <div className='contacts-map__popup'>
                <div className='contacts-map__popup-inner'>
                    <div className='contacts-map__popup-address'>
                        <span>Адрес</span>
                        Москва, ул. Островная 23, Гольф-Клуб, оф. 225
                </div>
                    <div className='contacts-map__popup-email'>
                        <span>E-mail</span>
                        woodland@gmail.com
                </div>
                    <div className='contacts-map__popup-phone'>
                        <span>Телефон</span>
                        8 800 750 32 45
                </div>
                    <div className='contacts-map__popup-social'>
                        <span>Соц. сети</span>
                        <ul>
                            <li>
                                <Link to={'/'}>
                                    <img src={SocialIcon1}></img>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    <img src={SocialIcon2}></img>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    <img src={SocialIcon3}></img>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={'map'} style={{ height: '70vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: YOUR_API_KEY,
                        language: 'ru'
                    }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="Новая метка"
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
};
export default Map;
