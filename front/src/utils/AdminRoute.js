import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAuthenticated } from '../Redux/actions';

export { AdminRoute };

function AdminRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        if (storedIsAuthenticated === 'true') {
            dispatch(setAuthenticated(true));
        }
    }, []);

    const userRole = localStorage.getItem('role');

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }


    if (userRole !== 'ADMIN') {
        return <Navigate to="/logout" />;
    }

    return children;
}
