import React from 'react';

import './radiobtn.scss';

const Radiobtn = ({ onChange, text, ...rest }) => {
    return (
        <label className="radio">
            {text}
            <input
                className="radio__controler"
                type="radio"
                {...rest}
                onChange={onChange}
            />
            <span className="radio__btn"></span>
        </label>
    );
};

export default Radiobtn;