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

  
  // bcrypt here
  

  const query = { 
    text: 'INSERT INTO public.user (username, password, first_name, last_name) values($1, $2, $3, $4);',
    values: [
      username,
      password,
      first_name,
      last_name
    ]
  };

  db.query(query);
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
          username.toLowerCase(),
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

userController.verifyUser = async (req, res, next) => {
  //Get username and password in request body (sent from user login event)
  const { username, password } = req.body;
  //If either one isn't filled in, return a fill in all fields error to the user
  try {
    if (!username || !password){
      throw new Error('Please fill all fields');
    }
    //Find the user in the database
    const query = {
      text:  `
        SELECT * 
        FROM public.user
        WHERE username=$1
      ;`,
      values: [
        username.toLowerCase()
      ]
    };
    // query returns row of one user
    const user = await db.query(query.text, query.values);
    const { rows } = user;
    //Use bcrypt to compare encrypted password to passed in string password
    const response = await bcrypt.compare(password, rows[0].password);
    if (response === true) {
      //If the password is a match, assign the user to res.locals and verify login
      res.locals.user = rows[0];
      console.log('user', res.locals.user);
      return next();
    }
    else{
      //If password is not a match, let the user know by returning an error
      throw new Error('Wrong password');
    }
    //Catch error and return to the global error handler
  } catch (err) {
    return next(createErr({
      method: 'verifyUser',
      type: 'verifyUserErr',
      err
    }));
  }
};


// Read to get user
// Delete user

// Login user
// Verify user

// TODO later convert to using global error handler: Low priority

// stretch
// update user info?

module.exports = userController;