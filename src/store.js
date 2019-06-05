import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import products from './reducers/productReducer';
import checkout from './reducers/checkoutReducer';

const reducers = combineReducers({
    products,
    checkout
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

store.subscribe(() => {
    console.log('Store updated: ', store.getState());
});

export default store;