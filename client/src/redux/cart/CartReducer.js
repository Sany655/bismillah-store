import { ADD_TO_CART, CLEAR_CART, DECREASE_ITEM, INCREASE_ITEM, REMOVE_FROM_CART } from "./CartTypes";

const initialState = {
    products: JSON.parse(localStorage.getItem('cart')) || [],
    total: parseFloat(localStorage.getItem('total')) || 0,
}

function CartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            let newCart;
            if (state.products) {
                let item = state.products.find(c => c.id === action.payload.id);
                if (item) {
                    item.quantity++
                    newCart = [
                        ...state.products.filter(p => p.id !== action.payload.id),
                        item
                    ]
                } else {
                    action.payload.quantity = 1;
                    newCart = [
                        ...state.products,
                        action.payload
                    ]
                }
            } else {
                newCart = [action.payload];
            }
            state.total = 0;
            for (let i = 0; i < newCart.length; i++) {
                state.total += parseFloat(newCart[i].price) * newCart[i].quantity;
            }
            localStorage.setItem('cart', JSON.stringify(newCart))
            localStorage.setItem('total', JSON.stringify(state.total))
            return {
                ...state,
                products: newCart,
                total: state.total
            }
        case REMOVE_FROM_CART:
            state.products.map((p, i) => {
                if (p.id === action.payload) {
                    state.total -= p.price * p.quantity;
                    state.products.splice(i, 1)
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.products))
            localStorage.setItem('total', JSON.stringify(state.total))
            return {
                ...state
            }
        case INCREASE_ITEM:
            state.products.map(c => {
                if (c.id === action.payload) {
                    c.quantity++
                    state.total += c.price;
                }
            });
            localStorage.setItem('cart', JSON.stringify(state.products))
            localStorage.setItem('total', JSON.stringify(state.total))
            return {
                ...state
            }
        case DECREASE_ITEM:
            state.products.map((c, i) => {
                if (c.id === action.payload) {
                    if (c.quantity > 1) {
                        c.quantity--
                    } else {
                        state.products.splice(i, 1);
                    }
                    state.total -= c.price;
                }
            });
            localStorage.setItem('cart', JSON.stringify(state.products))
            localStorage.setItem('total', JSON.stringify(state.total))
            return {
                ...state
            }
        case CLEAR_CART:
            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            return {
                ...state,
                products: [],
                total: 0
            }

        default:
            return state;
            break;
    }
}

export default CartReducer;