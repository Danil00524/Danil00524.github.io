import { all } from 'redux-saga/effects'
//sagas
import salon from './models/salon'

export function * sagas () {
    yield all([salon.operation()])
}