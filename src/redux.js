import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import weatherReducer from './weatherReducer'


const rootReducer = combineReducers({
    weatherReducer
})

const middlewareEnhancer = applyMiddleware(thunk)

const composeWithDevTools =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, middlewareEnhancer)