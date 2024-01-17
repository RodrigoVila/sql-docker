const mysql = require("mysql8")
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const q = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results, fields) => {
            if (error) reject(error);
            return resolve(results)
        })
    })
}

q("select * from Customers limit 10")
    .then(data => { console.log("Success: ", data) })
    .catch(err => { console.log("Error: ", err) })