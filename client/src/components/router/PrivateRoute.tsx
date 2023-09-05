import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import authStore from "../../store/AuthStore";


const PrivateRoute = observer(() => {

    return (
        authStore.isAuthenticated ? <Outlet/>: <Navigate to={'/'}/>
    );
});

export default PrivateRoute;