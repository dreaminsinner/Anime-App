const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    user: (localStorage.getItem('role')) || null,
    token: localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        case 'SET_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        case 'SET_ID':
            return {
                ...state,
                id: action.payload,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                role: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
