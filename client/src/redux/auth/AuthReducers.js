import { AUTH_ERROR, AUTH_LOADING, LOGIN, LOGOUT } from "./AuthTypes";

const initialState = {
    auth: localStorage.getItem('user')?true:false,
    user: JSON.parse(localStorage.getItem('user'))||{},
    loading:false,
    error:''
}

export default function AuthReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('user',JSON.stringify(action.payload));
            return{
                ...state,
                user:action.payload,
                auth:true
            }
            break;
        case LOGOUT:
            localStorage.removeItem('user');
            return{
                ...state,
                auth:false,
                user:{}
            }
        case AUTH_LOADING:
            return {
                ...state,
                loading:!state.loading
            }
        case AUTH_ERROR:
            return {
                ...state,
                error:action.payload
            }
        default: return state;
    }
}