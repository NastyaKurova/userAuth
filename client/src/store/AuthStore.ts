import {makeObservable, observable, action, runInAction} from 'mobx';
import {User, UserCredentials} from "../types/User";
import {userApiService} from "../api/userApiService";

class AuthStore {
    id = '';
    isAuthenticated = false;
    login = '';
    update_timestamp = 0;
    create_timestamp = 0;

    constructor() {
        makeObservable(this, {
            id: observable,
            isAuthenticated: observable,
            login: observable,
            update_timestamp: observable,
            create_timestamp: observable,
            setAuthUserStore: action,
            setUserDataStore: action,
            loginUser: action,
        });
    }

    setAuthUserStore(id: string, token: string | null) {
        this.isAuthenticated = !!token;
        this.id = id;
    }
    setUserDataStore(user: User) {
        this.id = user.id;
        this.login = user.login;
        this.update_timestamp = user.update_timestamp;
        this.create_timestamp = user.create_timestamp;
    }
    async loginUser({login, password}: UserCredentials): Promise<User> {
        try {
           const user: User = await userApiService.loginUser({login, password})

            runInAction(() => {
                this.setUserDataStore(user)
                this.setAuthUserStore(user.id, user.token)
            })
            return user

        } catch (err) {
            runInAction(() => {
                this.setAuthUserStore( '', null )
            })
            throw err;
        }
    }
}

const authStore = new AuthStore();
export default authStore;