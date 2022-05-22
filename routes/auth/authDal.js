const db = require('../../db');


const authDal = {
    sign: async(user) => {
        const queryStatement = `select id, role_id as "roleId", name as "fullName", password from auth.user_auth($1);`;
        const queryResult = await db.query(queryStatement, [user]).then(dbData => dbData).catch(error => error)
        return queryResult;
    },
    getUsersQty: async(email) => {
        const queryStatement = `select qty from auth.getUsersQuantity($1);`;
        const queryResult = await db.query(queryStatement, [email]).then(dbData => dbData).catch(error => error)
        return queryResult;
    },
    signUp: async(password, name, email) => {
        const queryStatement = `call auth.register_user($1, $2, $3);`;
        const queryResult = await db.query(queryStatement, [password, name, email]).then(dbData => dbData).catch(error => error)
        return queryResult;
    }
}

module.exports = authDal;