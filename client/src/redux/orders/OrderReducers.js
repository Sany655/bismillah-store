import { GET_MY_ORDERS } from "./OrderTypes";

const initialState = {
    orders:[],
    loading:false,
    error:""
}

export default function OrderReducers(state = initialState, action) {
    switch (action.type) {
        case GET_MY_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
            break;
        case "LOADING":
            return {
                ...state,
                loading:!state.loading
            }
        case "ERROR":
            return {
                ...state,
                error:action.payload
            }
        default: return state;
    }
}