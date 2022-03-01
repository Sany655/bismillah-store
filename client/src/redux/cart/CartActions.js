import { ADD_TO_CART, CLEAR_CART, DECREASE_ITEM, INCREASE_ITEM, REMOVE_FROM_CART } from "./CartTypes";

export function AddToCart(data) {
    return {
        type:ADD_TO_CART,
        payload:data
    }
}

export function RemoveFromCart(data) {
    return {
        type:REMOVE_FROM_CART,
        payload:data
    }
}

export function ClearCart() {
    return {
        type:CLEAR_CART,
    }
}

export function IncreaseItem(data) {
    return {
        type: INCREASE_ITEM,
        payload:data
    }
}

export function DecreaseItem(data) {
    return {
        type: DECREASE_ITEM,
        payload:data
    }
}