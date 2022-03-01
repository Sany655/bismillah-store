import { BUY_CAKE } from "./CakeTypes";

const initialState = {
    cakes:10
}

function CakeReducers(state = initialState,action) {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                cakes:state.cakes-1
            }
        default: return state;
    }
}

export default CakeReducers;