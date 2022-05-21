const db = require('../../db');


const authDal = {
    sign: async(user, resp) => {
        const queryStatement = `select id, role_id as "roleId", name as "fullName", password from auth.user_auth($1);`;
        const queryResult = await db.query(queryStatement, [user]).then(dbData => dbData).catch(error => error)
        return queryResult;
    }
}

module.exports = authDal;