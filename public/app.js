async function cargar() {
    const res = await fetch("/api/unidades");
    const data = await res.json();

    document.getElementById("total").innerText = data.length;

    let kmTotal = 0;
    let fuelTotal = 0;

    let html = "";

    data.forEach(u => {
        kmTotal += u.km;
        fuelTotal += u.fuel;

        html += `
        <div class="card">
            <h3>${u.nombre}</h3>
            <p>KM: ${u.km.toFixed(0)}</p>
            <p>Gasolina: ${u.fuel.toFixed(1)}%</p>
            <a href="unidad.html?id=${u.id}">Ver detalle</a>
        </div>`;
    });

    document.getElementById("km").innerText = kmTotal.toFixed(0);
    document.getElementById("fuel").innerText = (fuelTotal / data.length).toFixed(1);
    document.getElementById("lista").innerHTML = html;
}

setInterval(cargar, 3000);
cargar();
