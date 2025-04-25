let carrito = [];

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
        Swal.fire("Tu carrito está vacío");
        return;
    }

    let contenido = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        contenido += `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="images/${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 10px;">
                <div>
                    <strong>${producto.nombre}</strong><br>
                    $${producto.precio}
                </div>
                <button onclick="eliminarDelCarrito(${index})" style="margin-left:auto; background:#ff69b4; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Eliminar</button>
            </div>
        `;
    });

    contenido += `<hr><p><strong>Total:</strong> $${total}</p>`;

    Swal.fire({
        title: "🛒 Tu Carrito",
        html: contenido,
        showCloseButton: true,
        showConfirmButton: false,
        width: 500,
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
