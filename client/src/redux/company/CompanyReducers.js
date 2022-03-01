const initialState = {
    loading: false,
    company: localStorage.getItem('company') ? JSON.parse(localStorage.getItem('company')) : null,
    auth: localStorage.getItem('company') ? true : false,
}

function CompanyReducers(state = initialState, action) {
    switch (action.type) {
        case "COMPANY_REGISTER":
            localStorage.setItem('company',JSON.stringify(action.payload));
            return {
                ...state,
                company :action.payload,
                auth :true
            }
        case "COMPANY_LOGIN":
            localStorage.setItem('company', JSON.stringify(action.payload));
            return {
                ...state,
                company: action.payload,
                auth: true
            }
        case "COMPANY_LOGOUT":
            localStorage.removeItem('company')
            return {
                ...state,
                company: null,
                auth: false,
            }
        case "COMPANY_LOADING":
            return {
                ...state,
                loading:!state.loading
            }
        default: return state;
    }
}

export default CompanyReducers