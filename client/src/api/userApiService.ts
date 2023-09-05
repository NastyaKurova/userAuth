import 'reflect-metadata';
import {CreateUserResponse, LoginUserResponse} from "../types/User";
import client from "../qraphql/Client";
import {LOGIN_MUTATION, REGISTER_MUTATION} from "../qraphql/mutations/user";

export const userApiService ={

       loginUser: async (login: string, password: string) => {
        const response: LoginUserResponse = await client.request(LOGIN_MUTATION, {input:{login, password}});
        return response.loginUser;
},
      registerUser: async (login: string, password: string) =>{
        const response: CreateUserResponse = await client.request(REGISTER_MUTATION, {input:{login, password}});
        return response.createUser
    }
}
