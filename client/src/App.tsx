import React, {FC} from 'react';
import AppRouter from "./components/router/AppRouter";
import 'materialize-css';
import {Provider} from "inversify-react";
import container from "./services/inversify.config";
import {useAuth} from "./hooks/useAuth";

const App:FC =()=>{
    const { setStorageToken } = useAuth()
    setStorageToken()

    return (
        <Provider container={container}>
        <div className="App">
            <AppRouter/>
        </div>
        </Provider>
    );
}

export default App;
