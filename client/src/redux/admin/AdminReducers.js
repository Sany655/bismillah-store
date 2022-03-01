const initialState = {
    admin:localStorage.getItem('admin') ? true : false,
    loading:false,
    error:null
};

const AdminReducers = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            if (action.payload.username === "admin" && action.payload.password === "password") {
                localStorage.setItem('admin', true);
                return {
                    ...state,
                    admin : true,
                    error : null
                }
            }else{
                return {
                    ...state,
                    error:"Wrong Credentials"
                }
            }
        case "LOGOUT":
            localStorage.removeItem('admin');
            return {
                ...state,
                admin:false
            }
        case "LOADING":
            return {
                ...state,
                loading:!state.loading
            }
        default: return state;
    }
}

export default AdminReducers;