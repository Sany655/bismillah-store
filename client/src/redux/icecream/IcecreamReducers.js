import { BUY_ICECREAM, FINISH_ICECREAM } from "./IcecreamTypes";

const initialState = {
    icecreams: [
        { id: 1, name: "culfie", price: 25, img: "https://media.istockphoto.com/photos/kulfi-picture-id503011705?k=20&m=503011705&s=612x612&w=0&h=qqpQ-7YQ1qiC0lBRQqr8ULfNAq0xatM1em_NgKFi7Jo=" },
        { id: 2, name: "chawkbar", price: 40, img: "https://thumbs.dreamstime.com/b/melting-ice-cream-bar-white-tray-mealting-chocolate-77545874.jpg" },
        { id: 3, name: "cone", price: 60, img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chocolate-ice-cream-cone-duckycards.jpg" }
    ],
    boughts: []
}

export default function IcecreamReducer(state = initialState, action) {
    switch (action.type) {
        case BUY_ICECREAM:
            let newIcecream;
            let icecream = state.boughts.find(c => c.id === action.id)
            if (icecream) {
                icecream.quantity++;
                newIcecream = [...state.boughts.filter(c => c.id !== action.id), icecream]
            }
            else {
                const ice = state.icecreams.find(c => c.id === action.id);
                ice.quantity = 1;
                newIcecream = [...state.boughts, ice]
            }
            return {
                ...state,
                boughts: newIcecream
            }
        case FINISH_ICECREAM:
            let fNewIcecream;
            let fIcecream = state.boughts.find(c => c.id === action.id)
            if (fIcecream.quantity>1) {
                fIcecream.quantity--;
                fNewIcecream = [...state.boughts.filter(c => c.id !== action.id), fIcecream]
            }
            else {
                const ice = state.boughts.filter(c => c.id !== action.id);
                fNewIcecream = ice
            }
            return {
                ...state,
                boughts: fNewIcecream
            }
        default: return state;
    }
}