import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './login.scss';
import mailIcon from '../../../assets/icon/mail.svg';
import lockIcon from '../../../assets/icon/lock.svg';
import BtnWithSpinner from '../../../share-components/btn-with-spinner/BtnWithSpinner';
import EventEmitter from '../../../event-emitter/event-emitter';

const Login = () => {
    const [formControl, setFormControl] = useState({
        password: {
            value: '',
            isRequired: true,
            isInvalid: false,
            errorText: ''
        },
        email: {
            value: '',
            isRequired: true,
            isInvalid: false,
            errorText: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const dispatch = useDispatch();

    const submitBtn = (e) => {
        e.preventDefault();
        let hasError;
        if (!formControl.email.value && formControl.email.isRequired) {
            formControl.email.isInvalid = hasError = true;
            formControl.email.errorText = 'This is field is required.';
        }

        if (!formControl.password.value && formControl.password.isRequired) {
            formControl.password.isInvalid = hasError = true;
            formControl.password.errorText = 'This is field is required.';
        }

        if (hasError) {
            setFormControl({ ...formControl });
            return;
        }

        setIsLoading(true);
        dispatch({
            type: 'LOGIN',
            meta: {
                email: formControl.email.value,
                password: formControl.password.value,
                callback: ({ payload: { errors, data, message } }) => {
                    setIsLoading(false);

                    if (errors) {
                        for (let key in errors) {
                            const control = formControl[key];
                            if (control) {
                                control.isInvalid = true;
                                control.errorText = errors[key];
                            }
                        }

                        setFormControl({ ...formControl });
                        return;
                    }

                    if (message) {
                        setErrorText(message);
                        return;
                    }

                    dispatch({
                        type: 'SIGN_IN',
                        payload: data
                    });
                    EventEmitter.dispatch('modalClose', null);
                },
            },
        });
    };

    const focused = key => {
        formControl[key].isInvalid = false;
        setFormControl({ ...formControl });
    };

    const setValue = (key, value) => {
        formControl[key].value = value;
        setFormControl({ ...formControl });
    };

    return (
        <div className="form-login">
            <h4 className="form-login__title">Sign in to WhatSalon?</h4>
            {errorText && <p className="text-danger text-center">{errorText}</p>}
                <form className="search-salon__form mt-30 d-flex flex-column align-items-center">
                    <div className="form-group w-100 form-group--with-icon">
                        <img src={mailIcon} />
                        <input
                            type="text"
                            placeholder="Email"
                            className={`form-control form-control--without-border ${formControl.email.isInvalid ? 'is-invalid' : ''}`}
                            autoComplete='on'
                            value={formControl.email.value}
                            onChange={({ target: { value } }) => setValue('email', value)}
                            onFocus={() => focused('email')}
                        />
                        {formControl.email.isInvalid && <small className="text-danger">{formControl.email.errorText}</small>}
                    </div>

                    <div className="form-group w-100 form-group--with-icon">
                        <img src={lockIcon} />
                        <input 
                            type="password"
                            className={`form-control form-control--without-border ${formControl.password.isInvalid ? 'is-invalid' : ''}`}
                            value={formControl.password.value}
                            autoComplete='on'
                            onChange={({ target: { value } }) => setValue('password', value)}
                            placeholder="Password"
                            onFocus={() => focused('password')}
                        />
                        {formControl.password.isInvalid && <small className="text-danger">{formControl.password.errorText}</small>}
                    </div>

                    <BtnWithSpinner
                        type="submit"
                        className="btn btn--gradient form-login__btn mt-30"
                        onClick={submitBtn}
                        loading={isLoading}
                        borderRadius="22px"
                    >
                        Login    
                    </BtnWithSpinner>
                    {/* <button
                        type="submit"
                        className="btn btn--gradient form-login__btn mt-30"
                        onClick={submitBtn}
                    >
                        Login
                    </button> */}
                </form>
            </div>
    )
};

export default Login;
