import { BUY_CAKE } from "./CakeTypes";

export function BuyCake(data) {
    return {
        type:BUY_CAKE,
        data:data
    }
}