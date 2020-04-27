import React, { createContext, useReducer, useContext } from 'react';
import moment from 'moment';

const FilterSalonContext = createContext(null);

// TODO: create constant.js for types
const now = new Date();
const DATE_FORMAT = 'YYYY-MM-DD';

const initialReducer = {
    categories: {},
    services: {},
    isLoading: false,
    selectedCategory: null,
    selectedService: null,
    coordinates: {lat: 0, lng: 0},
    selectedDistance: null,
    distanceCollection: [
        { id: 0, value: 500, label: '500 m' },
        { id: 1, value: 1000, label: '1 km' },
        { id: 2, value: 2000, label: '2 km' },
        { id: 3, value: 5000, label: '5 km' },
        { id: 4, value: 10000, label: '10 km' },
    ],
    dateValue: now,
    dateFormat: DATE_FORMAT,
    dateFormatted: moment(now).format(DATE_FORMAT),
    salons: {}
};

function reducer( state, { type, payload }) {
    switch (type) {
        case 'startLoading' : {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'stopLoading' : {
            return {
                ...state,
                isLoading: false
            }
        }
        case 'onChangeCategory' : {
            return {
                ...state,
                selectedCategory: payload,
                selectedService: null
            }
        }
        case 'getCategories' : {
            return {
                ...state,
                categories: {...payload}
            };
        }
        case 'getServices' : {
            return {
                ...state,
                services: {...payload}
            }
        }
        case 'onChangeService' : {
            return {
                ...state,
                selectedService: payload
            }
        }
        case 'onChangeLocation' : {
            const {lat, lng} = payload;
            return {
                ...state,
                coordinates: {lat, lng}
            }
        }
        case 'onChangeDistance' : {
            return {
                ...state,
                selectedDistance: payload
            }
        }
        case 'onChangeDate' : {
            return {
                ...state,
                dateValue: payload,
                dateFormatted: moment(payload).format(DATE_FORMAT)
            }
        }
        case 'getSalons' : {
            return {
                ...state,
                salons: {...payload}
            }
        }
        default: {
            throw new Error('undefined action')
        }
    }
}

function FilterContextProvider(props) {
    const contextValue = useReducer(reducer, initialReducer);

    return (
        <div className={'filter-wrapper'}>
            <FilterSalonContext.Provider value={contextValue}>{props.children}</FilterSalonContext.Provider>
        </div>
    )
}

function useFilteredSalonLoading() {
    const [{isLoading}, dispatch] = useContext(FilterSalonContext);

    return {
        startLoading: () =>  dispatch({ type: 'startLoading' }),
        stopLoading: () =>  dispatch({ type: 'stopLoading' }),
        isLoading
    }
}

function useCategories() {
    const [{categories, selectedCategory}, dispatch] = useContext(FilterSalonContext);

    return {
        collection: categories,
        selected: selectedCategory,
        onChange: (value) => dispatch({ type: 'onChangeCategory', payload: value }),
        fetchCategories: (categories) => dispatch({ type: 'getCategories', payload: categories }),
    }
}

function useServices() {
    const [{services, selectedService}, dispatch] = useContext(FilterSalonContext);

    return {
        selected: selectedService,
        collection: services,
        getServices: (services) => dispatch({type: 'getServices', payload: services}),
        onChange: (serviceId) => dispatch({type: 'onChangeService', payload: serviceId})
    }
}

function useChangeLocation() {
    const [{coordinates}, dispatch ] = useContext(FilterSalonContext);

    return {
        coordinates,
        onChange: ({lat, lng}) => dispatch({type: 'onChangeLocation', payload: {lat, lng} })
    }
}

function useDistance() {
    const [{selectedDistance, distanceCollection}, dispatch] = useContext(FilterSalonContext);

    return {
        selected: selectedDistance,
        collection: distanceCollection,
        onChange: (distance) => dispatch({type: 'onChangeDistance', payload: distance})
    }
}

function useDate() {
    const [{dateValue, dateFormatted}, dispatch] = useContext(FilterSalonContext);

    return {
        onChange: (date) => dispatch({type: 'onChangeDate', payload: date}),
        value: dateValue,
        valueFormatted: dateFormatted
    }
}


function useFilteredSalons() {
    const [{salons}, dispatch] = useContext(FilterSalonContext);

    return {
        collection: salons,
        getSalons: (salons) => dispatch({ type: 'getSalons', payload: salons })
    }
}

export { FilterSalonContext, FilterContextProvider, useCategories, useFilteredSalonLoading, useServices, useChangeLocation, useDistance, useDate, useFilteredSalons };
