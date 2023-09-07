import 'reflect-metadata';
import {CreateUserResponse, GetUserResponse, LoginUserResponse, UserCredentials} from "../types/User";
import client from "../qraphql/Client";
import {LOGIN_MUTATION, REGISTER_MUTATION} from "../qraphql/mutations/user";
import {GET_CURRENT_USER_QUERY} from "../qraphql/queries/user";

export const userApiService = {

       loginUser: async ({login, password}: UserCredentials) => {
        const response: LoginUserResponse = await client.request(LOGIN_MUTATION, {input:{login, password}});
        return response.loginUser;
    },
      registerUser: async ({login, password}: UserCredentials) =>{
        const response: CreateUserResponse = await client.request(REGISTER_MUTATION, {input:{login, password}});
        return response.createUser
    },
      getUser: async (id: string) =>{
        const response: GetUserResponse = await client.request(GET_CURRENT_USER_QUERY, {id});
        return response.getUser
      }
}
