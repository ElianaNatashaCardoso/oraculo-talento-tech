const carritoContainer = document.getElementById("carrito-container");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (!carritoContainer) {
  console.error("No se encontró el contenedor carrito-container");
}

if (carrito.length === 0) {
  carritoContainer.innerHTML = "<p>🔍 El grimorio está vacío...</p>";
} else {
  carrito.forEach(id => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(producto => {
        const item = document.createElement("div");
        item.className = "card";
        item.innerHTML = `
          <img src="${producto.thumbnail}" alt="${producto.title}" />
          <h3>${producto.title}</h3>
          <p class="precio">Valor: $${producto.price}</p>
        `;
        carritoContainer.appendChild(item);
      });
  });
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  alert("🔮 El grimorio fue vaciado");
  location.reload();
}

function finalizarCompra() {
  localStorage.removeItem("carrito");
  alert("🎉 Invocación completada. Regresando al Oráculo...");
  window.location.href = "index.html";
}
