const mssql = require("mssql")
require('dotenv').config()

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.HOST,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const q = async (sql) => {
    try {
        await mssql.connect(config)
        const result = await mssql.query(sql)
        console.log("REESSSS", result)
        return result
    } catch (err) {
        console.error("Error connecting: ", err)
        return { err: JSON.stringify(err) }
    }
}

q("select * from Customers limit 2")
    .then(data => console.log("Success!!: ", data))
    .catch(err => console.log("Error!!: ", err))