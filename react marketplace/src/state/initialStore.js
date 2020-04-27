import {store as reducer} from './index'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {sagas} from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const moddlewares = [sagaMiddleware]

const enhancers = applyMiddleware(...moddlewares)

export const store = createStore(reducer, enhancers);

sagaMiddleware.run(sagas)