import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {removeIsAuthenticatedFromLocalStorage} from "../../utils/remove-auth";
import {useDispatch} from "react-redux";
import {logout} from "../../Redux/actions";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogout = () => {
            removeIsAuthenticatedFromLocalStorage();
            dispatch(logout());
            navigate('/login');
        };

        handleLogout();
    }, [dispatch, navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
