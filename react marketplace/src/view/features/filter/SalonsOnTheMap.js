import React from 'react';
import { useFilteredSalons, useFilteredSalonLoading } from './FilterContextProvider';
import { compose } from 'recompose';
import { GOOGLE_URL } from '../../../config/googelMaps';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithMarkers = compose(
    withScriptjs,
    withGoogleMap,
)(({ markers }) => {
    const map = React.useRef(null);
    const [zoom, setZoom] = React.useState(8);
    const [center, setCenter] = React.useState({lat: 0, lng: 0});

    const isMarkersUpdates = markers.reduce((string, marker) => string.concat(`${marker.lat}_${marker.lng}`), '');

    React.useEffect(() => {
        if (map.current) {
            const bounds = new window.google.maps.LatLngBounds();
            if(markers.length === 1) {
                const marker = markers[0];

                setZoom(8);
                setCenter({...marker})

            } else if(markers.length > 1) {
                markers.forEach(marker => bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng)));

                map.current.fitBounds(bounds);
            }
        }
    }, [isMarkersUpdates]);

    return (
        <GoogleMap ref={map} zoom={zoom} center={center} defaultCenter={{ lat: 0, lng: 0 }}>
            {markers.map(({ id, ...marker }) => {
                console.log({ marker });
                return <Marker key={id} position={marker} />;
            })}
        </GoogleMap>
    );
});

export default function SalonsOnTheMap(props) {
    const { collection } = useFilteredSalons();
    const { isLoading } = useFilteredSalonLoading();

    const markers = Object.values(collection).map(position => ({
        lat: position.latitude,
        lng: position.longitude,
        id: position.id,
    }));

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                {Object.keys(collection).length > 0 ? (
                    <MapWithMarkers
                        markers={markers}
                        googleMapURL={GOOGLE_URL}
                        loadingElement={<div style={{ height: `100%`,width: '100%'  }} />}
                        containerElement={<div style={{ height: `100%`, width: '100%'  }} />}
                        mapElement={<div style={{ height: `100%`, width: '100%' }} />}
                    />
                ) : (
                    <div>Search for a salon to see them on the map</div>
                )}
            </div>
        </>
    );
}
