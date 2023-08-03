export const saveIsAuthenticatedToSessionStorage = (isAuthenticated, token, role, id) => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
};