import { GET_MY_ORDERS } from "./OrderTypes"

export const getMyOrders = (data) => {
    return {
        type: GET_MY_ORDERS,
        payload: data
    }
}