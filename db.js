const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {

    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
    )`);

    db.run(`
    CREATE TABLE IF NOT EXISTS unidades (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        nombre TEXT,
        lat REAL,
        lng REAL,
        km REAL,
        fuel REAL
    )`);

    db.run(`INSERT OR IGNORE INTO users (id, username, password)
            VALUES (1, 'admin', '1234')`);

    for (let i = 1; i <= 5; i++) {
        db.run(`INSERT OR IGNORE INTO unidades 
        (id, user_id, nombre, lat, lng, km, fuel)
        VALUES (?,1,?,?,?,?,?)`,
        [i, "Unidad " + i, 22.15 + Math.random(), -100.98 + Math.random(), 10000, 80]);
    }

});

module.exports = db;
