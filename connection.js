// FILE UNTUK BUAT CONNECTION MySQL
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "terserahh",
    database: "sekolahku"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("Successfully connected to MySQL!");
    }
});

module.exports = db;