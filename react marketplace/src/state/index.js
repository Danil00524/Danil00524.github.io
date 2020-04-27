import {combineReducers} from 'redux';
// reducers
import salon from './models/salon'

export const store = combineReducers({
    [salon.name] : salon.reducer
})
