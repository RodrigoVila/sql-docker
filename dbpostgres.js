const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
})

const q = (sql, params) => {
    return new Promise(async(resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) reject(err);
            client.query(sql, params, (error, result) => {
                done()
                if (error) reject(error)
                return resolve(result.rows)
            })
        }
        )
    })
}

q("select * from customers limit 2", [])
    .then(rows => console.log("Success: ", rows))
    .catch(err => console.log("Error: ", err))

module.exports = { q }