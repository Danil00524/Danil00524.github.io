import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import './datepicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = ({ dateToDisplay = '', setData, disabled, ...restProps }) => {
    const [date, setDate] = useState(dateToDisplay);
    const [isActiveInput, setIsActiveInput] = useState(false);

    return (
        <div className="form-group position-relative">
            <DatePicker
                placeholderText="Select date"
                selected={date}
                onChange={newDate => {
                    setDate(newDate);
                    setData(newDate);
                }}
                onInputClick={() => setIsActiveInput(true)}
                onBlur={() => setIsActiveInput(false)}
                disabled={disabled}
                {...restProps}
            />
            <div className={`arrow ${disabled ? 'arrow--hide' : ''} ${isActiveInput ? 'arrow--active' : ''}`}></div>
        </div>
        
    );
};

export default Datepicker;
