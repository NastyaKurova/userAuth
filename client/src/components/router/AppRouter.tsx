import React, {FC} from 'react';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import UserPage from "../../pages/UserPage/UserPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter:FC = () => {
    return (
<BrowserRouter>
    <Routes>
        <Route element={<PrivateRoute/>}>
            <Route element={<UserPage/>} path={'/user'}></Route>
        </Route>
        <Route element={<LoginPage/>} path={'/login'}></Route>
        <Route element={<RegisterPage/>} path={'/register'}></Route>
        <Route element={<MainPage/>} path={'/'}></Route>
    </Routes>
</BrowserRouter>
    );
};

export default AppRouter;