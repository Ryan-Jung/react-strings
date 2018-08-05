// Database configuration settings

//Load environmental variables from .env file
var result = require('dotenv').config();

if(result.error){
   throw "Error loading enviromental variables" + result.error;
}

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: "./migrations"
    }
  },

  production: {
    client: 'mysql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: "./migrations"
    }
  },

};
