const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, './.env') })

module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: process.env.DATABASE,
            host: process.env.HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD
        },
        migrations: {
            directory: __dirname + '/migrations',
          },
        seeds: {
            directory: __dirname + '/seeds',
          },
      },
    
}