// Set up database connection

const configSettings = require('./knexfile');
const { development, production } = configSettings;

const config = process.NODE_ENV === 'development' ? development : production;

const db = require('knex')(config);

module.exports = db;
