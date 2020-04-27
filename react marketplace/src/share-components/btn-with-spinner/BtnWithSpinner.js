import React from 'react';
import Spinner from '../spinner/Spinner';

const BtnWithSpinner = ({ children, loading, className = '', borderRadius, ...props }) => {
    return (
        <button
            className={`${className} position-relative`}
            disabled={loading}
            {...props}
        >
            {children}
            {loading && <Spinner style={{borderRadius}}/>}
        </button>
    );
};

export default BtnWithSpinner;