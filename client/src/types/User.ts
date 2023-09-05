export type User={
    login:string;
    update_timestamp:number;
    create_timestamp:number;
}
export type LoginUserResponse = {loginUser:User}
export type CreateUserResponse = {createUser:User}
