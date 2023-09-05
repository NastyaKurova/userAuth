export const LOGIN_MUTATION =`
       mutation loginUser($input: UserInput){
    loginUser(input: $input){
    login,
    update_timestamp,
    create_timestamp,
    token
  }
  }
      `;
export const REGISTER_MUTATION =`
       mutation createUser($input: UserInput){
    createUser(input: $input){
    login,
    update_timestamp,
    create_timestamp,
    token
  }
  }
      `;