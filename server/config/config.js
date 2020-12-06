require('dotenv').config();

module.exports = {
"development": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT,
    "dialect": "mysql",
    "charset" : 'utf8mb4'
},
"test": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "database_test",
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT,
    "dialect": "mysql",
    "charset" : 'utf8mb4'
},
"production": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "database_production",
    "host": process.env.HOST,
    "port": process.env.MYSQL_PORT,
    "dialect": "mysql",
    "charset" : 'utf8mb4'
}
};
