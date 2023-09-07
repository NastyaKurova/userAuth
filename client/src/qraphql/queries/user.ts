export const GET_CURRENT_USER_QUERY =`
query getUser($id: ID) {
  getUser(id: $id) {
    id
    login
    update_timestamp
    create_timestamp
  }
}  `;