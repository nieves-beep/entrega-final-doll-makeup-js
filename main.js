document.addEventListener("DOMContentLoaded", () => {
    Swal.fire({
        title: "¡Bienvenido a Doll Makeup Store! 💖",
        text: "Descubrí los mejores productos de maquillaje",
        icon: "info",
        confirmButtonText: "¡Vamos!"
    });

    document.getElementById("btnIniciarSesion").addEventListener("click", iniciarSesion);
    document.getElementById("btnCarrito").addEventListener("click", mostrarCarrito);

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => console.error("Error cargando productos:", error));
});

let carrito = [];

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        const img = document.createElement("img");
        img.src = "images/" + producto.imagen;
        img.alt = producto.nombre;
        img.classList.add("producto-imagen");

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = "$" + producto.precio;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.classList.add("boton-agregar");

        boton.addEventListener("click", () => {
            carrito.push(producto);
            actualizarContadorCarrito();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `"${producto.nombre}" agregado al carrito`,
                showConfirmButton: false,
                timer: 1500
            });
        });

        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(boton);

        contenedor.appendChild(card);
    });
}

function iniciarSesion() {
    Swal.fire({
        title: "Iniciar Sesión",
        html: `
            <input id="swal-input-usuario" class="swal2-input" placeholder="Usuario">
            <input id="swal-input-password" type="password" class="swal2-input" placeholder="Contraseña">
        `,
        confirmButtonText: "Ingresar",
        showCancelButton: true,
        preConfirm: () => {
            const usuario = document.getElementById("swal-input-usuario").value;
            const contraseña = document.getElementById("swal-input-password").value;

            if (usuario === "admin" && contraseña === "1234") {
                Swal.fire("¡Éxito!", "Inicio de sesión correcto", "success");
            } else {
                Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
            }
        }
    });
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        Swal.fire("Carrito vacío", "No hay productos en el carrito", "info");
        return;
    }

    let html = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 5px 0;">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button onclick="eliminarDelCarrito(${index})" style="background-color: pink; border: none; padding: 5px; border-radius: 5px;">❌</button>
            </div>
        `;
        total += parseFloat(producto.precio);
    });

    html += `<hr><p style="text-align: right; font-weight: bold;">Total: $${total.toFixed(2)}</p>`;

    Swal.fire({
        title: "🛍️ Carrito",
        html: html,
        showCloseButton: true,
        showConfirmButton: false
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    mostrarCarrito();
}

function actualizarContadorCarrito() {
    document.getElementById("contadorCarrito").textContent = `(${carrito.length})`;
}
