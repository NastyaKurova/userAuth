import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import { useInjection } from 'inversify-react';
import authStore from "../../store/AuthStore";
import {DateService} from "../../services/srvices";


const UserPage:FC = observer(() => {
    const formatDate = useInjection(DateService);
    const updateDate=formatDate.getFormattedDate(authStore.update_timestamp)
    const createDate=formatDate.getFormattedDate(authStore.create_timestamp)

    return (
        <div className="container">
            <div className="row textCenter">
                <h1>User info</h1>
                <div>Login: {authStore.login}</div>
                <div>update_timestamp: {updateDate}</div>
                <div>create_timestamp: {createDate}</div>
            </div>
        </div>
    );
});

export default UserPage;