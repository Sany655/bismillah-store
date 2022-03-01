import { GET_PRODUCTS, GET_SINGLE_PRODUCT, LOADING_PRODUCTS, PRODUCTS_ERROR, SEARCH_PRODUCTS } from "./productTypes";

export function getProducts(data) {
    return {
        type:GET_PRODUCTS,
        payload:data
    }
}

export function loadingProducts() {
    return {
        type:LOADING_PRODUCTS
    }
}

export function productError(data) {
    return {
        type:PRODUCTS_ERROR,
        payload:data
    }
}

export function searchProducts(data) {
    return {
        type:SEARCH_PRODUCTS,
        payload:data
    }
}

export function getProduct(data) {
    return {
        type:GET_SINGLE_PRODUCT,
        payload:data
    }
}