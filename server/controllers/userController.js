const db = require('../models/sqlModel');
const userController = {};

//Create a new user
userController.createUser = (req, res, next) => {

  const { username, password, first_name, last_name } = req.body;

  const query = { 
    text: 'INSERT INTO public.user (username, password, first_name, last_name) values($1, $2, $3, $4);',
    values: [
      username,
      password,
      first_name,
      last_name
    ]
  };

  db.query(query)
    .then(response => {
      res.locals.newUser = response;
      return next()
    }).catch(error){
        {return next({
          log: `createUser error handler caught an error: ${error}`,
          message: {err: 'userController.createUser: ERROR: Check server logs for details'}
        });
        }

    }
}

module.exports = userController;