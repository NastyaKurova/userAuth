import React, {FC, useCallback, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import { useInjection } from 'inversify-react';
import authStore from "../../store/AuthStore";
import {DateService} from "../../services/srvices";
import {userApiService} from "../../api/userApiService";
import {Link} from "react-router-dom";
import classes from "./userPage.module.css";

const UserPage:FC = observer(() => {
    const { isAuthenticated, id, login, update_timestamp, create_timestamp } = authStore;
    const formatDate = useInjection(DateService);
    const updateDate=formatDate.getFormattedDate(update_timestamp)
    const createDate=formatDate.getFormattedDate(create_timestamp)

    const getCurrentUser = useCallback(async (id: string) => {
        const user = await userApiService.getUser(id)
        authStore.setUserDataStore(user)
    },[])

    useEffect(()=>{
        if(isAuthenticated && !login){
            getCurrentUser(id)
        }
    },[id, isAuthenticated, login, getCurrentUser])

    return (
        <div className="container">
            <div className={`row ${classes.userPage}`}>
                <Link to={'/'}>Back to main page</Link>
                <div className="textCenter">
                    <h1>User info</h1>
                    <div>Login: {login}</div>
                    <div>update_timestamp: {updateDate}</div>
                    <div>create_timestamp: {createDate}</div>
                </div>
            </div>
        </div>
    );
});

export default UserPage;