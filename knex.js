let env = process.version.NODE_ENV || "development"
let config = require('./knexfile.js')[env];
module.exports = require('knex')(config)