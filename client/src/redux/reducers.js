import { combineReducers } from "redux";
import AdminReducers from "./admin/AdminReducers";
import AuthReducers from "./auth/AuthReducers";
import CakeReducers from "./cake/CakeReducers";
import CartReducer from "./cart/CartReducer";
import CompanyReducers from "./company/CompanyReducers";
import IcecreamReducer from "./icecream/IcecreamReducers";
import OrderReducers from "./orders/OrderReducers";
import ProductReducers from "./products/productReducers";

const reducers = combineReducers({
    cakes:CakeReducers,
    icecream:IcecreamReducer,
    products:ProductReducers,
    cart:CartReducer,
    order:OrderReducers,
    auth:AuthReducers,
    admin:AdminReducers,
    company:CompanyReducers,
})

export default reducers;