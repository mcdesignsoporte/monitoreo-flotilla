const userId = localStorage.getItem("userId");

if (!userId) {
    window.location = "login.html";
}

async function cargar() {
    const res = await fetch("/api/unidades/" + userId);
    const data = await res.json();

    let html = "";

    data.forEach(u => {
        let color = u.fuel < 30 ? "red" : u.fuel < 60 ? "orange" : "green";

        html += `
        <div class="card">
            <h3>${u.nombre}</h3>
            <p>KM: ${u.km.toFixed(0)}</p>
            <p style="color:${color}">⛽ ${u.fuel.toFixed(1)}%</p>
        </div>`;
    });

    document.getElementById("lista").innerHTML = html;
}

setInterval(cargar, 3000);
cargar();
