import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';

import './marketplaceSearchForm.scss';
import Radiobtn from './components/Radiobtn';
import SearchServiceHOC from './SearchServiceHOC';
import EventEmitter from '../../../event-emitter/event-emitter';
import BtnWithSpinner from '../../../share-components/btn-with-spinner/BtnWithSpinner';

const MarketplaceSearchForm = ({ history }) => {
    const [displayToShow, setDisplayToShow] = useState('service');
    const [formControl, setFormControl] = useState({
        service: {
            value: '',
            isRequired: true,
            isInvalid: false
        },
        salon: {
            value: '',
            isRequired: true,
            isInvalid: false
        },
        location: {
            value: null,
            isRequired: true,
            isInvalid: false
        },
        date: {
            value: '',
            isRequired: true,
            isInvalid: false
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // TODO: add unsubscribe on destroy hook
    // TODO: add logic for coordinates, because value of this variable is an object
    // IMPORTANT: EventEmitter.subscribe returns function, which is unsubscriber. please, implement unsubscribption of the each function, when the component will destroy
    useEffect(() => {
        const serviceSubscription = EventEmitter.subscribe('serviceChange', event => setValue('service', event));
        const dateSubscription = EventEmitter.subscribe('dateChange', event => setValue('date', event));
        const locationSubscription = EventEmitter.subscribe('locationChange', event => setValue('location', event));
        const salonSubscription = EventEmitter.subscribe('salonChange', event => setValue('salon', event));

        return () => {
            serviceSubscription();
            dateSubscription();
            locationSubscription();
            salonSubscription();
        };
    }, []);

    const setValue = (key, value) => {
        formControl[key].value = value;
        setFormControl({ ...formControl });
    };

    const submitBtn = e => {
        e.preventDefault();
        let hasError;

        switch (displayToShow) {
            case 'salon':
                if (!formControl.salon.value && formControl.salon.isRequired) {
                    formControl.salon.isInvalid = hasError = true;
                    setFormControl({ ...formControl });
                    return;
                }

                const queryParams =  { name: formControl.salon.value };

                const search = queryString.stringify(queryParams);

                setIsLoading(true);
                dispatch({
                    type: 'TEST',
                    meta: {
                        queryParams: { search },
                        callback: ({ error, payload }) => {
                            setIsLoading(false);
                            if (!error) {
                                dispatch({
                                    type: 'SALONS',
                                    payload: payload ? Object.values(payload) : []
                                });
                            }
                        },
                    },
                });

                return;
            case 'service':
                if (!formControl.service.value && formControl.service.isRequired) {
                    formControl.service.isInvalid = hasError = true;
                }
                if (!formControl.location.value && formControl.location.isRequired) {
                    formControl.location.isInvalid = hasError = true;
                }
                if (!formControl.date.value && formControl.date.isRequired) {
                    formControl.date.isInvalid = hasError = true;
                }

                if (hasError) {
                    setFormControl({ ...formControl });
                    return;
                }

                // same
                history.push({
                    pathname: '/search-services',
                    // you can parse this query in a component, where you could recieve it
                    search: `?category_id=${formControl.service.value}&date=${convertTime(formControl.date.value)}&lat=${formControl.location.value.lat}&lng=${formControl.location.value.lng}`
                });
        }
    };

    const convertTime = date => {
        const dateInst = new Date(date);
        let dd = dateInst.getDate();
        let mm = dateInst.getMonth() + 1;
        const yyyy = dateInst.getFullYear();

        if (dd < 10) {
          dd = '0' + dd;
        } 
        if (mm < 10) {
          mm = '0' + mm;
        }

        // PAY ATTENTION: i don't know, what the date format we should send to the server, so you can change it, if it necessary
        return `${dd}/${mm}/${yyyy}`;
    };

    return (
        <div
            className="search-salon shadow"
            onClick={({ target }) => {
                let attribute = target.getAttribute('id');
                attribute = attribute === 'google-places-autocomplete-input' ? 'location' : attribute;
                if (formControl[attribute]) {
                    formControl[attribute].isInvalid = false;
                    setFormControl({ ...formControl });
                }
            }}
        >
            <h4>Find Salon</h4>
            <form className="search-salon__form mt-30">
                <div
                    className="form-group d-flex justify-content-between"
                    onChange={
                        ({ target: { value } }) => {
                            setDisplayToShow(value === 'search_service' ? 'service' : 'salon');

                            for (let key in formControl) {
                                formControl[key].isInvalid = false;
                            }

                            setFormControl({ ...formControl });
                        }
                    }
                >
                    <Radiobtn
                        value="search_service"
                        name="search_type"
                        text="Search service"
                        defaultChecked
                    />
                    <Radiobtn
                        value="search_salon"
                        name="search_type"
                        text="Search salon"
                    />
                </div>
                <div className="form-group">
                    <SearchServiceHOC displayToShow={displayToShow} formControl={formControl}/>
                </div>

                <BtnWithSpinner
                    type="submit"
                    className="btn btn--gradient mt-30"
                    onClick={e => submitBtn(e)}
                    loading={isLoading}
                >
                    Find
                </BtnWithSpinner>
            </form>
        </div>
    )
};

export default withRouter(MarketplaceSearchForm);
