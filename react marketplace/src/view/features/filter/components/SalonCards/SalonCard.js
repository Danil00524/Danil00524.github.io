import React from 'react';
import Rating from '@material-ui/lab/Rating';
import './styles.scss';

export default function SalonCard({ name, preview, address, rating_avg }) {
    return (
        <div className={'salon-card-container'}>
            <div className="salon-card-container__preview-wrapper">
                <img src={preview.data.url} alt={name} className="salon-card-container__image" />
            </div>
            <div className={'salon-card-container__body'}>
                <p className="salon-card-container__salon-name">{name}</p>

                <div className="salon-card-container__btn-group">
                    <button className={'button-primary'}>i</button>
                    <button className={'button-primary'}>instant book</button>
                </div>

            </div>
            <div className={'salon-card-container__footer'}>
                <div className="salon-card-container__address-box">{address}</div>
                <div className={'salon-card-container__rating-box'}>
                    <Rating name="half-rating" value={rating_avg} precision={0.5} />
                </div>
            </div>
        </div>
    );
}
