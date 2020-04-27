import React from 'react'

import {GOOGLE_URL} from '../../../config/googelMaps'

import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { compose, withProps, lifecycle} from 'recompose'
import {withScriptjs} from 'react-google-maps'


const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: GOOGLE_URL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.setState({
                        places,
                    }, () => {
                        const {places} = this.state;
                        const {lat, lng} = places[0].geometry.location;
                        const [_lat, _lng] = [lat(), lng()];

                        this.props.onLocationChange({lat: _lat, lng: _lng})
                    });
                },
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                disabled={props.disabled}
                type="text"
                placeholder="Customized your placeholder"
                className={'input-text-component'}
                style={{
                    width: `100%`,
                }}
            />
        </StandaloneSearchBox>
    </div>
);

function StandAloneSearchPlaces({onLocationChange, disabled}) {
    return (
        <PlacesWithStandaloneSearchBox disabled={disabled} onLocationChange={onLocationChange} />
    )
}


export default StandAloneSearchPlaces