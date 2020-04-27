import React, { useEffect } from 'react';
import {
    useCategories,
    useServices,
    useChangeLocation,
    useDistance,
    useDate,
    useFilteredSalons,
    useFilteredSalonLoading
} from './FilterContextProvider';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from '../../core/inputs/Select/Select'
//
import StandAloneSearchPlaces from '../../core/inputs/StandAloneSearchPlaces';
import DatePicker from '../../core/inputs/DatePicker/DatePicker';

import queryString from 'query-string';
import moment from 'moment'

// TODO: should be imported
function SelectCategoriesList() {
    const categories = useCategories();
    const {isLoading} = useFilteredSalonLoading();

    function handleChangeCategory({ target: { value } }) {
        categories.onChange(value);
    }

    const _value =
        Object.keys(categories.collection).length > 0 &&
        categories.selected &&
        categories.collection[categories.selected].id;

    const options =
        Object.keys(categories.collection).length > 0 &&
        Object.values(categories.collection).reduce(
            (memo, category) => {
                memo.push(
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>,
                );
                return memo;
            },
            [<option selected="false" disabled="disabled">Select Category</option>],
        );

    return (
        <Select disabled={isLoading} value={_value || undefined} name={'category'} onChange={handleChangeCategory}>
            {options}
        </Select>
    );
}

function SelectServiceSearch() {
    // const { selected: selectedCategoryId, ...categories } = useCategories();
    const {isLoading} = useFilteredSalonLoading();
    const services = useServices();

    const inputValue =
        Object.keys(services.collection).length > 0 && services.selected && services.collection[services.selected].id;

    function handleChange({ target: { value } }) {
        services.onChange(value);
    }

    const options = () => {
        let defaultOption = [<option selected="true" disabled="disabled">Select Service</option>];
        Object.values(services.collection).forEach(service => {
            defaultOption.push(
                <option key={service.id} value={service.id}>
                    {service.name}
                </option>,
            );
        });
        return defaultOption;
    };

    return (
        <Select disabled={isLoading} style={{ width: '180px', textOverflow: `ellipses` }} name="service" value={inputValue} onChange={handleChange}>
            {options()}
        </Select>
    );
}

function SelectMapLocation() {
    const { onChange } = useChangeLocation();
    const {isLoading} = useFilteredSalonLoading();

    return <StandAloneSearchPlaces disabled={isLoading} onLocationChange={onChange} />;
}

function SelectDistance(props) {
    const { selected, collection, onChange } = useDistance();
    const {isLoading} = useFilteredSalonLoading();
    //handlers
    const handleChange = ({ target: { value } }) => onChange(value);
    // value
    const value = selected && selected in collection && collection[selected].id;
    // options
    // disabled={'disabled'} defaultValue
    const options = [<option selected="true" disabled="disabled">Radius</option>];
    collection.forEach(({ label, id }) =>
        options.push(
            <option key={id} value={id}>
                {label}
            </option>,
        ),
    );

    console.log({"inputValueServiceSelectDistance" : value})

    return (
        <Select disabled={isLoading} name={'distance'} onChange={handleChange} value={value || undefined}>
            {options}
        </Select>
    );
}

function PickDate() {
    const date = useDate();
    const {isLoading} = useFilteredSalonLoading();

    return <DatePicker disabled={isLoading} value={date.value} onChange={date.onChange} />;
}

const TEST_URL = '?category_id=2&date=2019-10-30&lat=30&lng=20&searchBy=category';

function FilterSalonByCategoryForm(props) {
    // TODO: START LOADING / STOP LOADING ACTIONS
    const dispatch = useDispatch();
    const {startLoading, stopLoading} = useFilteredSalonLoading();

    const categories = useCategories();
    const services = useServices();
    const distance = useDistance();
    const location = useChangeLocation();
    const { valueFormatted, ...time } = useDate();
    const salons = useFilteredSalons();

    useEffect(() => {
        // TODO: handle request to get categories
        startLoading();
        dispatch({
            type: 'TEST_CATEGORY',
            meta: {
                callback: ({ payload }) => {
                    categories.fetchCategories(payload);
                    // TODO: CREATE HELPER FUNCTION TO HANDLE THIS
                    try {

                        const { category_id, date, lat, lng } = queryString.parse(props.location.search);

                        // TODO: predefine values from location.search query params
                        // TODO: SETTING LAT & LNG
                        // time.onChange(new Date(date));
                        categories.onChange(category_id);
                        distance.onChange({lat,lng})
                    } catch (e) {
                        console.log('error', e);
                    } finally {
                        stopLoading()
                    }

                },
            },
        });
    }, []);

    useEffect(() => {
        // TODO: handle request to get services in categories
        if (categories.selected) {
            startLoading()
            dispatch({
                type: 'TEST_SERVICE',
                meta: {
                    categoryId: categories.selected,
                    callback: status => {
                        const { payload } = status;

                        services.getServices(payload);
                        stopLoading()
                    },
                },
            });
        }
    }, [categories.selected]);

    useEffect(() => {
        // TODO: handle request to get salons
        if (categories.selected) {
            startLoading()
            // TODO: REFACTORING IS REQUIRED
            const _distance = distance.collection.find(radius => radius.id === distance.selected);
            let _date = undefined;
            //
            if(moment(valueFormatted, time.dateFormat).isValid()) {
                const now = new Date();
                _date = moment(valueFormatted, 'YYYY-MM-DD').isSameOrAfter(now) && valueFormatted
            }
            // TODO: SETTING LAT & LNG
            const _queryParams = {
                category_id : categories.selected || undefined,
                service_id : services.selected || undefined,
                longitude: location.coordinates.lat || undefined,
                latitude: location.coordinates.lng || undefined,
                distance: _distance,
                date: _date || undefined,
            }

            const _search = queryString.stringify(_queryParams);

            dispatch({
                type: 'TEST',
                meta: {
                    queryParams: {search: _search},
                    callback: status => {
                        salons.getSalons(status.payload);
                        stopLoading()
                    },
                },
            });
        }
    }, [
        categories.selected,
        services.selected,
        distance.selected,
        location.coordinates,
        valueFormatted,
        props.location.search,
    ]);

    return (
        <div className={'input-filters-wrapper'}>
            <div className={'inline-input'}>
                <SelectCategoriesList />
                <SelectServiceSearch />
            </div>
            <div>
                <SelectMapLocation />
            </div>
            <div className={'inline-input'}>
                <p className="text text--nowrap mr-5">More filters: </p>
                <div className={'mr-5'}>
                    <PickDate />
                </div>
                <div>
                    <SelectDistance />
                </div>
            </div>
        </div>
    );
}

export default withRouter(FilterSalonByCategoryForm);
