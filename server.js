const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

let unidades = [];

for (let i = 1; i <= 5; i++) {
    unidades.push({
        id: i,
        nombre: "Unidad " + i,
        lat: 22.1565 + Math.random() * 0.01,
        lng: -100.9855 + Math.random() * 0.01,
        km: 10000 + Math.random() * 5000,
        fuel: 50 + Math.random() * 50
    });
}

setInterval(() => {
    unidades.forEach(u => {
        u.lat += (Math.random() - 0.5) * 0.001;
        u.lng += (Math.random() - 0.5) * 0.001;
        u.km += Math.random() * 0.3;
        u.fuel -= Math.random() * 0.1;
    });
}, 3000);

app.get("/api/unidades", (req, res) => {
    res.json(unidades);
});

app.get("/api/unidad/:id", (req, res) => {
    const unidad = unidades.find(u => u.id == req.params.id);
    res.json(unidad);
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
