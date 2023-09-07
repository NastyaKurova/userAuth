export type User={
    id: string;
    login: string;
    update_timestamp: number;
    create_timestamp: number;
    token: string;
}
export type LoginUserResponse = {loginUser:User}
export type CreateUserResponse = {createUser:User}
export type GetUserResponse = {getUser:User}
export type UserCredentials = {
    login: string,
    password: string
}
