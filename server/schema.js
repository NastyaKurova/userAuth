const {buildSchema} = require('graphql')

const schema = buildSchema(`
    
    type User {
        id: ID
        login: String
        password: String
        update_timestamp: Float
        create_timestamp: Float
        token: String
    }
     input UserInput {
        login: String!
        password: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(input: UserInput): User
        loginUser(input: UserInput): User
    }

    
`)

module.exports = schema