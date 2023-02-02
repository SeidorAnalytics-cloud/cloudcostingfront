import {createStore, combineReducers,applyMiddleware } from 'redux'
import Mode from './setting/setting'
import { costingSlice } from './slices/costing/costingSlice'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    mode: Mode,
    costing: costingSlice.reducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
)
