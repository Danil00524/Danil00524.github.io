import axios from 'axios'
import {takeEvery, call, cps} from 'redux-saga/effects'
import filterSalon from '../../../API/handlers/filterSalon'
import fetchCategoriesBySalonId from '../../../API/handlers/serviceByCategoryId'
import fetchCategoriesList from '../../../API/handlers/fetchCategoriesList'
import {login, getProfile} from '../../../API/handlers/auth'

import {parseIdToKeyObjectCollection} from "../../../utils";

let counter = 0;
function * testOperations({meta: { queryParams: {search}, callback }}) {
    const status = { error: false, success: false, payload: {} };
    console.log({
        "search" : search
    })
    try {
        const response = yield call(axios, filterSalon(search));


        const salonCollection = parseIdToKeyObjectCollection(response.data.data)

        console.log(JSON.stringify(salonCollection, null, 4 ))
        counter += 1
        console.log({'counter' : counter})

        status.payload = Object.assign({}, salonCollection);
        status.success = true;
    } catch (e) {
        console.log({Error: e})

        status.error = true
    } finally {
        yield cps(callback, status)
    }
}

function * getServicesByCategoryId({meta: {categoryId, callback}}) {
    const status = { error: false, success: false, payload: {} };
    try {
        const response = yield call(axios, fetchCategoriesBySalonId({categoryId}))

        const servicesCollection = parseIdToKeyObjectCollection(response.data.data)

        status.payload = Object.assign({}, servicesCollection);
        status.success = true;

        // console.log(JSON.stringify(response.data, null, 4))
    } catch (e) {
        status.error = true
    } finally {
        yield cps(callback, status)
    }
}

function * getCategories({meta: { callback } }) {
    const status = { error: false, success: false, payload: {} };
    try {

        const response = yield call(axios, fetchCategoriesList());

        const categoriesCollection = parseIdToKeyObjectCollection(response.data.data)

        status.success = true
        status.payload = Object.assign({}, categoriesCollection);

        // console.log(JSON.stringify(response.data, null ,4))
    } catch (e) {
        status.error = true
    } finally {
        yield cps(callback, status)
    }
}

function * sendCredentials({meta: { callback, email, password } }) {
    const status = { error: false, success: false, payload: {} };
    try {

        const response = yield call(axios, login({ email, password }));

        status.success = true;
        status.payload = { data: { ...response.data.data, ...response.data.meta } };

        console.log(`Login response: ${response}`)
    } catch (e) {
        status.error = true;
        console.log(e.response)
        status.payload = e.response.data;
    } finally {
        yield cps(callback, status)
    }
}

function * getUserProfile({meta: { callback, token } }) {
    const status = { error: false, success: false, payload: {} };
    try {

        const response = yield call(axios, getProfile(token));

        status.success = true;
        status.payload = { data: { ...response.data.data, ...response.data.meta } };

        console.log(`Profile response: ${response}`);
    } catch (e) {
        status.error = true;
        status.payload = e.response.data;
    } finally {
        yield cps(callback, status);
    }
}

export default function * sagas() {
    yield takeEvery('TEST', testOperations);
    yield takeEvery('TEST_SERVICE', getServicesByCategoryId);
    yield takeEvery('TEST_CATEGORY', getCategories);
    yield takeEvery('LOGIN', sendCredentials);
    yield takeEvery('GET_PROFILE', getUserProfile);
}