const carrito = [];

const carritoItems = document.getElementById("carrito-items");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const totalCarrito = document.getElementById("total-carrito");

function actualizarCarrito() {
    carritoItems.innerHTML = "";  // Limpiar los productos actuales

    // Agregar los productos al carrito
    carrito.forEach((producto, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button class="eliminar-producto" data-index="${index}">Eliminar</button></td>
        `;
        carritoItems.appendChild(row);
    });

    // Calcular el total del carrito
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
    });

    // Actualizar el total
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

const botonesAgregar = document.querySelectorAll(".agregar-al-carrito");
botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", function(event) {
        const producto = event.target.closest(".producto");
        const id = producto.getAttribute("data-id");
        const nombre = producto.querySelector("h3").textContent;
        const precioTexto = producto.querySelectorAll("p")[1].textContent; 
        const precio = parseFloat(precioTexto.replace("Precio: $", ""));
        const imagen = producto.querySelector("img").src;

        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.find(p => p.id === id);
        if (productoExistente) {
            productoExistente.cantidad++;  // Si ya existe, aumentar cantidad
        } else {
            // Si no existe, agregar al carrito
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            });
        }

        actualizarCarrito();  // Actualizar la vista del carrito
    });
});

vaciarCarritoBtn.addEventListener("click", function() {
    carrito.length = 0;  // Vaciar el carrito
    actualizarCarrito();  // Actualizar la vista después de vaciar
});

// Delegación de eventos para el botón "Eliminar"
carritoItems.addEventListener("click", function(event) {
    // Verificamos si el clic ocurrió en un botón con la clase 'eliminar-producto'
    if (event.target && event.target.classList.contains("eliminar-producto")) {
        const index = parseInt(event.target.getAttribute("data-index")); // Obtener el índice
        carrito.splice(index, 1);  // Eliminar el producto por índice
        actualizarCarrito();  // Actualizar la vista después de eliminar
    }
});

// Inicializar el carrito
actualizarCarrito();