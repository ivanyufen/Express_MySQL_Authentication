const express = require("express");
const app = express();
const auth_route = require("./route/auth_route");

app.use(auth_route);


app.get("/", (req, res) => {
    res.send({ "status": "Server active" });
});

app.listen(4001, () => {
    console.log("Server running on port 4001");
})
