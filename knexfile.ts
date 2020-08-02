const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src','database', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src','database', 'migrations'),
    },
    useNullAsDefault: true,
  },
}