const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// LOGIN
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username=? AND password=?`,
    [username, password], (err, user) => {
        if (user) res.json({ success: true, user });
        else res.json({ success: false });
    });
});

// UNIDADES POR USUARIO
app.get("/api/unidades/:userId", (req, res) => {
    db.all(`SELECT * FROM unidades WHERE user_id=?`,
    [req.params.userId], (err, rows) => {
        res.json(rows);
    });
});

// SIMULACIÓN TIEMPO REAL
setInterval(() => {
    db.all("SELECT * FROM unidades", [], (err, rows) => {
        rows.forEach(u => {
            db.run(`UPDATE unidades SET 
                lat = lat + (?),
                lng = lng + (?),
                km = km + (?),
                fuel = fuel - (?)
            WHERE id=?`,
            [
                (Math.random()-0.5)*0.001,
                (Math.random()-0.5)*0.001,
                Math.random()*0.3,
                Math.random()*0.1,
                u.id
            ]);
        });
    });
}, 3000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor listo en puerto " + PORT));
