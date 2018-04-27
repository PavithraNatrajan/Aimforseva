/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : config.js*

//Purpose /Functionality: create the connection pool to mysql database
              

// Author : Rajesh Kumar Ranjan(T0007)

// Createdon: 17-feb-1018

// Change history:

// v1.10 date of change /Author name

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/

/**

* Author : Rajesh Kumar Ranjan(T0007) , Created on:17-feb-2018 , Purpose:
* @param
      
* @return

* Change history

: **/
var mysql = require('mysql');
require('dotenv').config();
var app = require('./bin/dev');

var connection = mysql.createPool({

  connectionLimit:400,
/*  host     : 'localhost',
  user     : 'root',
  password : 'rootphp',
  database : 'seva'*/
   host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
  
})
connection.getConnection(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});

module.exports = connection;