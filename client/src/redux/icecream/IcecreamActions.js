import { BUY_ICECREAM, FINISH_ICECREAM } from "./IcecreamTypes";

export function buyIcecream(id) {
    return {
        type:BUY_ICECREAM,
        id:id
    }
}

export function finishIcecream(id) {
    return {
        type:FINISH_ICECREAM,
        id:id
    }
}