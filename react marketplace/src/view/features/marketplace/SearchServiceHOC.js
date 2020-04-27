import React from 'react';

import ServiceNameSelect from "./components/ServiceNameSelect";
import LocationAutocomplete from "./components/LocationAutocomplete";
import Datepicker from "../../../share-components/datepicker/Datepicker";
import EventEmitter from '../../../event-emitter/event-emitter';
import SalonSearchInput from './components/SalonSearchInput';

const SearchServiceHOC = ({ displayToShow, formControl }) => {
    const setId = id => {
        console.log('ID in HOC: ', id)
        EventEmitter.dispatch('serviceChange', id);
    };

    const setLocation = (lat, lng) => {
        console.log('location in HOC lat, lng: ', lat, lng)
        EventEmitter.dispatch('locationChange', lat && lng ? { lat, lng } : null);
    };

    const setData = date => {
        console.log('date: ', date)
        EventEmitter.dispatch('dateChange', date);
    };

    const setSalonName = salonName => {
        console.log('salon name: ', salonName)
        EventEmitter.dispatch('salonChange', salonName);
    };

    return(
        <>
            <ServiceNameSelect
                setId={setId}
                disabled={displayToShow === 'salon'}
                className={`form-control ${formControl.service.isInvalid ? 'is-invalid' : ''}`}
                id="service"
            />
            <div className="form-group">
                {
                    displayToShow === 'service'
                    &&
                    <LocationAutocomplete
                        setLocation={setLocation}
                        className={`form-control ${formControl.location.isInvalid ? 'is-invalid' : ''}`}
                    />
                }
                {
                    displayToShow === 'salon'
                    &&
                    <SalonSearchInput
                        formControl={formControl}
                        setSalonName={e => setSalonName(e)}
                    />
                }
            </div>
            <Datepicker
                setData={setData}
                disabled={displayToShow === 'salon'}
                className={`form-control ${formControl.date.isInvalid ? 'is-invalid' : ''}`}
                id="date"
            />
        </>
    )
};

export default SearchServiceHOC;
