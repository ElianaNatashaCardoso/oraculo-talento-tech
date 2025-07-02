document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productos-container");
  if (!container) {
    console.error("No se encontró el contenedor productos-container");
    return;
  }

  fetch("https://dummyjson.com/products?limit=12")
    .then(res => res.json())
    .then(data => {
      data.products.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${producto.thumbnail}" alt="${producto.title}" />
          <h3>${producto.title}</h3>
          <p class="precio">Valor: $${producto.price}</p>
          <button onclick='agregarAlCarrito(${producto.id})' class="boton-mistico">Añadir al grimorio</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Error al cargar productos:", err));
});

function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!carrito.includes(id)) {
    carrito.push(id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✨ Artefacto añadido al grimorio ✨");
  } else {
    alert("🪄 Ya está en el grimorio");
  }
}
