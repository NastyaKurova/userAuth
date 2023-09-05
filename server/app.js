const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const {graphqlHTTP} =require('express-graphql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const PORT = 5001;
const app = express();

app.use(cors());

const db = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE, err => {
    if (err) return console.log(err)
});

const createUserData = ({password,login}) => {
    const hashedPassword = bcrypt.hashSync(password,10)
    const update_timestamp = Date.now();
    const create_timestamp = Date.now();
    return {
            update_timestamp, create_timestamp, login, password : hashedPassword
        }
}

function fetchAllUsers() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`
        db.all(sql,[],(err, users) => {
            if (err) return  reject(err)
            if (users.length < 1) return reject(new Error('no match'))
            return resolve(users)
        })
    });
}
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id LIKE '%${id}%'`
        db.all(sql,[],(err, user) => {
            if (err) return reject(err)
            if (user.length < 1) return reject(new Error('no match'))
            return resolve(...user)
        })
    });
}
function fetchUserByLogin(login) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE login = '${login}'`
        db.get(sql,[],(err, user) => {
            if (err) return reject(({status: 300, success: false, message: err}))
            return resolve(user)
        })
    });
}

const root = {
    getAllUsers: async () => {
        try{
            return await fetchAllUsers()
        } catch(e){
            return e
        }

    },
    getUser: async ({id}) => {
        try{
            return await fetchUser(id)
        } catch(e){
            return e
        }

    },
    createUser: async({input}) => {
        try {
            const userData = await fetchUserByLogin(input.login)
            if (userData) return new Error('user already exists')

            const {login, password, update_timestamp, create_timestamp} = createUserData(input)

            const sql = 'INSERT INTO users(login, password, update_timestamp, create_timestamp) VALUES (?,?,?,?)'
            db.run(sql, [login, password, update_timestamp, create_timestamp], (err) => {
                if (err) return new Error(err)
            })
            return { login, update_timestamp, create_timestamp }

        } catch(e) {
            return new Error('User has not been created')
        }
    },
    loginUser: async({input}) => {
        try {
            const {login, password} = input
            if (!password) return new Error('Enter password')
            const userData = await fetchUserByLogin(login)

            if (!userData) return new Error('Can not login')
            const isMatch = await bcrypt.compare(password, userData?.password)
            if (!isMatch) return new Error('Can not login')
            const currentTimestamp = Date.now();
            const sql = ` UPDATE users SET update_timestamp = ? WHERE login = ?;`
            db.run(sql, [currentTimestamp, userData.login], (err) => {
                if (err) return new Error(err)
            })
            const updatedUserData = await fetchUserByLogin(login)

            const token  = jwt.sign({userId: updatedUserData.id},'secret',{expiresIn: '1h'})
            return {
                token,
                login: updatedUserData.login,
                update_timestamp: updatedUserData.update_timestamp,
                create_timestamp: updatedUserData.create_timestamp
            }

        } catch(e) {
            return new Error('Login error')
        }
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema,
    rootValue:root
}));

async function start(){
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users(ID INTEGER PRIMARY KEY, login, password, update_timestamp, create_timestamp)`
        db.run(sql)
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    }
    catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}


start()
