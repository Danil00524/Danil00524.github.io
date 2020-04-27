import React from 'react';
import './style.scss';

function Select({ children, value, name, onChange, disabled, ...props }) {
    return (
        <select
            className={'select-input-component'}
            name={name}
            value={value || undefined}
            onChange={onChange}
            disabled={disabled}
            {...props}
        >
            {children}
        </select>
    );
}

export default Select;
