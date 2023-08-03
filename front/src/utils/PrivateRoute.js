import {Navigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {setAuthenticated} from '../Redux/actions';

export {PrivateRoute};

function PrivateRoute({children}) {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        if (storedIsAuthenticated === 'true') {
            dispatch(setAuthenticated(true));
        }
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}
