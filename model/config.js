/* Project Name :AIM for Seva
Filename : config.js 
Purpose / Functionality: Configuration file to establish a connection to the database
*/


var logger = require('../logger');
var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createPool({

    connectionLimit: 400,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

})
connection.getConnection(function(err) {
    if (err);
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;