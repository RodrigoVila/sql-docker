const oracledb = require("oracledb")
require('dotenv').config()

let pool = null
let connection = null

try {
    oracledb.initOracleClient({
        libDir: "C:\\oracle"
    })
} catch (error) {
    console.log("Error connecting to Oracle", error)
}

const getPool = async (con) => {
    return new Promise(async (resolve, reject) => {
        if (pool) resolve(pool)
        try {
            pool = await oracledb.createPool(con)
            resolve(pool)
        } catch (error) {
            reject(error)
        }
    })
}

const q = async (sql, params) => {
    try {
        await getPool({
            user: "c##datos",
            password: process.env.PASSWORD,
            connectString: process.env.ORACLE_CN,
            poolAlias: "curso"
        })

        connection = await oracledb.getConnection('curso')
        const result = await connection.execute(
            sql,
            params, { outFormat: oracledb.OUT_FORMAT_OBJECT })
        return result
    } catch (err) {
        console.error("Error processing query: ", err)
        return { err: JSON.stringify(err) }
    } finally {
        if (connection) await connection.close()
    }
}

q("select * from customers", [])
    .then(data => console.log("Success!!: ", data))
    .catch(err => console.log("Error!!: ", err))