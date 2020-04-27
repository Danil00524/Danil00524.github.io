import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import housesReducer from './housesReducer';
import serviceReducer from './serviceReducer';
import teamReducer from './teamReducer';

const rootReducer = combineReducers({
    articles: articlesReducer,
    houses: housesReducer,
    service: serviceReducer,
    team: teamReducer
})

export default rootReducer;
