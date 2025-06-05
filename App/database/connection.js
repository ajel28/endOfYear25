const mysql = require('mysql2');

const dbConfig = {
    host: "sqlclassdb-instance-1.cqjxl5z5vyvr.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "elijah-amir-erik",
    password: "password123450",
    database: "end_of_year",
    connectTimeout: 10000
}

const conenction = mysql.createConnection(dbConfig);

module.exports = conenction;