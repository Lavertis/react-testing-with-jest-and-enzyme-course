import rootReducer from '../src/reducers';
import {applyMiddleware, createStore} from "redux";
import {middlewares} from "../src/configureStore";

export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}

export const findByTestAttribute = (wrapper, value) => {
    return wrapper.findWhere(node => node.prop('data-test') === value);
}