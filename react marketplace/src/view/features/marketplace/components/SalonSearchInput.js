import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './salon-search-input.scss';

const SalonSearchInput = ({ formControl, setSalonName }) => {
    const salons = useSelector(state => state['@@salon'].salons);
    const dispatch = useDispatch();

    const onChange = event => {
        if (salons) {
            dispatch({
                type: 'SALONS',
                payload: null
            });
        }
        setSalonName(event.target.value)
    }

    return (
        <div className="search-salon-input">
            <input
                placeholder="Enter salon name"
                type="text"
                id="salon"
                value={formControl.salon.value}
                className={`form-control ${formControl.salon.isInvalid ? 'is-invalid' : ''}`}
                onChange={onChange}
            />
            {formControl.salon.value && <div className="close close--grey" onClick={() => {
                setSalonName('');
                dispatch({
                    type: 'SALONS',
                    payload: null
                });
            }}></div>}
            {
                salons && salons.length > 0 &&
                (
                    <div className="search-salon-input__salons">
                        {salons.map(salon => (
                            <Link to={`/${salon.id}`} key={salon.id} className="d-flex align-items-center search-salon-input__salon">
                                <img src={salon.preview.data.url}/>
                                <h3 className="ml-3">{salon.name ? salon.name : 'N/A'}</h3>
                            </Link>
                        ))}
                    </div>
                )
            }
            {
                salons && !salons.length &&
                (
                    <div className="search-salon-input__salons search-salon-input__salons--empty">
                        Nothing was found.
                    </div>
                )
            }
        </div>
    );
};

export default SalonSearchInput;