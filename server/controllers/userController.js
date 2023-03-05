const db = require('../models/sqlModel');
const bcrypt = require('bcrypt');

const userController = {};

// helper function to create userController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
  };
};

const SALT_WORK_FACTOR = 10;

//Create a new user
userController.createUser = (req, res, next) => {

  const { username, password, first_name, last_name } = req.body;
  // regex for non a-z characters at the start of any of these vars
  const regex = /^[^a-z]+/gi;
  // might not catch "" strings??
  if(regex.test(first_name) 
    || regex.test(last_name)
    || regex.test(username)
    || regex.test(password)) return next(createErr({
    method: 'createUser',
    type: 'createUserError',
  }));

  bcrypt.hash(password, SALT_WORK_FACTOR)
    .then((hashPassword) => {
      const query = { 
        text: `
          INSERT INTO public.user 
            (username, password, first_name, last_name) 
          VALUES
            ($1, $2, $3, $4) 
          RETURNING *
        ;`,
        values: [
          username,
          hashPassword,
          first_name,
          last_name
        ]
      };
      return query;
    })
    .then((query) => (db.query(query.text, query.values)))
    .then(response => {
      const { rows } = response;
      res.locals.newUser = rows[0];
      return next();
    })
    .catch(err => {
      return next(createErr({
        method: 'createUser',
        type: 'createUserErr',
        err
      }));
    });
};

// Read to get user
// Delete user

// Login user
// Verify user

// stretch
// update user info?

module.exports = userController;