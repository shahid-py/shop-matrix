import { createStore, combineReducers, applyMiddleware,  } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Reducers
import { cartReducer } from "./reducers/cartReducers";
import { wishlistReducer } from './reducers/wishlistReducers';
import {
    getProductsReducer,
    getProductDetailsReducer,
  } from "./reducers/productReducers";
  
const reducer =combineReducers({
cart: cartReducer,

wishlist: wishlistReducer,
getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware=[thunk];

const cartFromLocalStorage =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
const wishlistFromLocalStorage =localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []
const INITIAL_STATE ={
  cart :{
    cartItems: cartFromLocalStorage
  },
  wishlist:{
wishlistItems: wishlistFromLocalStorage
  }
}
const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;