import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productTopRatedReducer, productReviewCreateReducer, productUpdateReducer, productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
import { userRegisterReducer } from './reducers/userReducers'
import { userDetailsReducer } from './reducers/userReducers'
import { userUpdateProfileReducer } from './reducers/userReducers'
import { userListReducer } from './reducers/userReducers'
import { userDeleteReducer } from './reducers/userReducers'
import { userUpdateReducer } from './reducers/userReducers'
import {orderListReducer,  orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderDeliverReducer } from './reducers/orderReducers'



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,


})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, },
    userLogin: {userInfo: userInfoFromStorage},
    
}

//console.log(initialState.cart.shippingAddress);


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store