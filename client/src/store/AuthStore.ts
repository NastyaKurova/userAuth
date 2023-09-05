import { makeObservable, observable, action } from 'mobx';
import {User} from "../types/User";

class AuthStore {
    isAuthenticated = false;
    login = '';
    update_timestamp = 0;
    create_timestamp = 0;

    constructor() {
        makeObservable(this, {
            isAuthenticated: observable,
            login: observable,
            update_timestamp: observable,
            create_timestamp: observable,
            loginUser: action,
            registerUser: action,
        });
    }

    loginUser(user: User) {
        this.isAuthenticated = true;
        this.login = user.login;
        this.update_timestamp = user.update_timestamp;
        this.create_timestamp = user.create_timestamp;
    }

    registerUser(user: User) {
        this.isAuthenticated = true;
        this.login = user.login;
        this.update_timestamp = user.update_timestamp;
        this.create_timestamp = user.create_timestamp;
    }
}

const authStore = new AuthStore();
export default authStore;