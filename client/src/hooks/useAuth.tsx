import { useCallback } from 'react';
import authStore from "../store/AuthStore";
import {User, UserCredentials} from "../types/User";
import {StorageKeys} from "../types/Auth";

export const useAuth = () => {

    const login = useCallback(async ({login, password}: UserCredentials) => {
        try{
            const user: User = await authStore.loginUser({login, password})
            localStorage.setItem(StorageKeys.AuthToken, JSON.stringify({
                userId: user?.id, token: user?.token
            }))
            return user
        }
        catch(err) {
            throw err
        }

    }, [])


    const logout = useCallback(() => {
        localStorage.removeItem(StorageKeys.AuthToken)
        authStore.setAuthUserStore('', null)
    }, [])


    const setStorageToken = useCallback(() => {
        const userData = localStorage.getItem(StorageKeys.AuthToken);
        if (userData) {
            const data = JSON.parse(userData)
            authStore.setAuthUserStore(data.userId, data.token)
        }

    }, [])


    return { login, logout, setStorageToken }
}