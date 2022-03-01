import { GET_PRODUCTS, GET_SINGLE_PRODUCT, LOADING_PRODUCTS, PRODUCTS_ERROR, SEARCH_PRODUCTS } from "./productTypes";

const initialState = {
    product: [],
    singleProduct:{},
    loading: false,
    error: null,
    searchData:[]
}
export default function ProductReducers(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                product:action.payload
            };
            break;
        case LOADING_PRODUCTS:
            return {
                ...state,
                loading:!state.loading
            }
        case PRODUCTS_ERROR:
            return {
                ...state,
                error:action.payload
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                searchData:state.product.filter(p=>p.title.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case GET_SINGLE_PRODUCT:
            return {
                ...state,
                singleProduct:state.product.find(p=>p.id===action.payload)
            }
        default: return state;
    }
}