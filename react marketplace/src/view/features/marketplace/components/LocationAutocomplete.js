import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const LocationAutocomplete = ({ setLocation, className }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder="Select location"
            inputClassName={className}
            onSelect={({ description }) => {
                geocodeByAddress(description)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        setLocation(lat, lng)
                    }
                )}
            }
        />
    );
};

export default LocationAutocomplete;

