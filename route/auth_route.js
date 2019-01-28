// EXPRESS ROUTER
const router = require("express").Router();

// FOR USING MySQL connection
const db = require("../connection");

//BODY PARSER
const bodyParser = require("body-parser");

// USE BODY PARSER
router.use(bodyParser.json());

// SIGN UP 
router.post("/signup", (req, res) => {
    let data = req.body;

    // IF USER SIGN UP WITH UNCOMPLETE PROPERTIES
    if ((req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) == false) {
        res.send("You need a complete email, username, and password to sign up!");
    }
    else {
        //CHECK WHETHER THE USER EXIST
        let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            else if (result.length > 0) { //IF THE USERNAME / EMAIL ALREADY REGISTERED
                res.send({
                    "signup": "failed",
                    "status": "Anda sudah terdaftar dengan username/email yang sama!"
                });
            }
            else { //NEW USER SUCCESS SIGN UP
                let sql = `INSERT INTO users SET ?`;
                db.query(sql, data, (err, result) => {
                    res.send({
                        "username": req.body.username,
                        "email": req.body.email,
                        "status": "Signup sukses"
                    });
                })
            }
        })
    }
});

// LOG IN
router.post("/login", (req, res) => {
    // VALIDATE USER HAVE TO LOGIN USING EITHER EMAIL OR USERNAME, CAN'T BOTH
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username')) {
        res.send("Please choose either email or username! You can't use both.");
    }
    // VALIDATE PROPERTY PASSWORD REQUIRED
    else if (!req.body.hasOwnProperty('password')) {
        res.send("You need a password to log in");
    }
    else {
        //VALIDASI WHETHER USERNAME / EMAIL EXIST IN DATABASE
        let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            else if (result == 0) { //IF THE USER DOESNT EXIST
                res.send({
                    "login": "failed",
                    "status": "Akun tidak terdaftar"
                });
            }
            else {
                if (req.body.password != result[0].password) { //IF USER EXIST, BUT PASSWORD DOESNT MATCH
                    res.send({
                        "login": "failed",
                        "status": "Password salah"
                    });
                }
                else { //LOGIN SUCCESS
                    res.send({
                        "login": "ok",
                        "status": "Login sukses"
                    });
                }
            }
        })
    }
});




module.exports = router;
