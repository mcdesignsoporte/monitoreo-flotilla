const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const map = L.map('map').setView([22.1565, -100.9855], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

let marker = L.marker([22.1565, -100.9855]).addTo(map);

async function cargar() {
    const res = await fetch("/api/unidad/" + id);
    const u = await res.json();

    document.getElementById("nombre").innerText = u.nombre;
    document.getElementById("km").innerText = u.km.toFixed(0);
    document.getElementById("fuel").innerText = u.fuel.toFixed(1);

    marker.setLatLng([u.lat, u.lng]);
    map.setView([u.lat, u.lng]);
}

setInterval(cargar, 3000);
cargar();
