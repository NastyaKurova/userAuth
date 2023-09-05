import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import authStore from "../../store/AuthStore";
import {User} from "../../types/User";
import classes from "../../styles/authPage.module.css";
import {userApiService} from "../../api/userApiService";
import {Errors} from "../../types/Errors";



const LoginPage:FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate();
    const handleLogin=(e: ChangeEvent<HTMLInputElement>)=>{
        setLogin(e.target.value)
       if(error) setError('')
    }
    const handlePassword=(e: ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
        if(error) setError('')
    }
    const handleLoginUser = async(e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if (!login || !password) return setError(Errors.FillFields)
        try {
            const user: User = await userApiService.loginUser(login, password)
            authStore.loginUser(user);
            if (user?.login) return navigate('/user')

        } catch (error) {
            setError(JSON.parse(JSON.stringify(error))?.response?.errors[0]?.message)
        }
    }
    return (
        <div className="container">
            <div  className={`row ${classes.authPage}`}>
                <Link to={'/'}>Back to main page</Link>
                <h1 className={classes.authPageHeader}>Login page</h1>
                <form action="" className="col m6 s12 offset-m3">
                    <label htmlFor="">Login</label>
                    <input type="text" value={login} onChange={handleLogin}/>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={handlePassword}/>
                    <span className={`helper-text ${classes.authPageHelpText}`} data-error="wrong">{error}</span>
                    <div className="textCenter">  <button className="btn light-blue" onClick={handleLoginUser}>Login</button></div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;