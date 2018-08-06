// Database configuration settings

/*
   Load enviornmental variables.
   *We have to make sure the current working directory is pointing
    to the correct directory during migration and server start up
    in order for the environmental variables to be correctly loaded
*/
const startDirectory = process.cwd();
process.chdir(__dirname);
const envVariables = require('dotenv').config();
process.chdir(startDirectory);

if (envVariables.error) {
  throw envVariables.error;
}

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './migrations',
    },
  },
};
