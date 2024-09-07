import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import rootReducer from "./RootReducer";

export function configureStore(){

    return createStore(rootReducer, applyMiddleware(thunk))
}