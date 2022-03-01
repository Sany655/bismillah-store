import { LOGIN, AUTH_LOADING, AUTH_ERROR, LOGOUT } from "./AuthTypes";

export function LoginAction(data) {
    return {
        type: LOGIN,
        payload: data
    }
}
export function LogoutAction() {
    return {
        type: LOGOUT
    }
}

export function AuthLoading() {
    return {
        type:AUTH_LOADING
    }
}

export function AuthError(data) {
    return {
        type:AUTH_ERROR,
        payload:data
    }
}