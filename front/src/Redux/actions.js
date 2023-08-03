export const setAuthenticated = (isAuthenticated) => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    return {
        type: 'SET_AUTHENTICATED',
        payload: isAuthenticated,
    };
};

export const setRole = (role) => {
    localStorage.setItem('role', role);
    return {
        type: 'SET_ROLE',
        payload: role,
    };
};

export const setId = (id) => {
    localStorage.setItem('id', id);
    return {
        type: 'SET_ID',
        payload: id,
    };
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};

export const logout = () => {
    localStorage.clear();
    return {
        type: 'LOGOUT',
    };
};
