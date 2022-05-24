const db = require('../../db');

const authDal = {
    /**
   * Returns users according to an user email parameter value.
   * @param {string} user - user's email.
   */
    sign: async(user) => {
        const queryStatement = `select id, role_id as "roleId", name as "fullName", password, favoritesubbreed as "favoriteSubBreed", favoritebreed as "favoriteBreed" from auth.user_auth($1);`;
        const queryResult = await db.query(queryStatement, [user]).then(dbData => dbData).catch(error => error)
        return queryResult;
    },
     /**
   * Returns an numeric ammount of users with and user email parameter value.
   * @param {string} email - user's email.
   */
    getUsersQty: async(email) => {
        const queryStatement = `select qty from auth.getUsersQuantity($1);`;
        const queryResult = await db.query(queryStatement, [email]).then(dbData => dbData).catch(error => error)
        return queryResult;
    },
     /**
   * Creates an account in database with all its dependencies.
   * @param {string} password - password with which the user will access
   * @param {string} name - name that identificates the user.
   * @param {string} email - email(unique) with which the user will access
   */
    signUp: async(password, name, email) => {
        const queryStatement = `call auth.register_user($1, $2, $3);`;
        const queryResult = await db.query(queryStatement, [password, name, email]).then(dbData => dbData).catch(error => error)
        return queryResult;
    },
    setAsFavoriteBreed: async(breed, subBread, email) => {
        const queryStatement = `call auth.update_user_favorite($1, $2, $3);`;
        const queryResult = await db.query(queryStatement, [email, subBread, breed]).then(dbData => dbData).catch(error => error)
        return queryResult;
    }
}

module.exports = authDal;