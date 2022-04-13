const express = require("Express")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dna',
})

app.get("/", (req, res) => {

    const sqlInsert = "INSERT INTO diseases (disease_name, dna_sequence) VALUES ('flu', 'AGCTTGCAACGTACGTACTA');"
    db.query(sqlInsert, (err, result) => {
        res.send("query executed")
    })
})

app.listen(3001, () => {
    console.log("Server is connected")
})