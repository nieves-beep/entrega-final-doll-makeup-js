let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    Swal.fire({
        title: "¡Bienvenido a Doll Makeup Store! 💖",
        text: "Descubrí los mejores productos de maquillaje",
        icon: "info",
        confirmButtonText: "¡Vamos!"
    });

    document.getElementById("btnIniciarSesion").addEventListener("click", iniciarSesion);

    document.getElementById("btnCarrito").addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire("Tu carrito está vacío :(");
            return;
        }

        let lista = carrito.map(p => `${p.nombre} - $${p.precio}`).join("<br>");

        Swal.fire({
            title: "Productos en tu carrito",
            html: lista,
            confirmButtonText: "Cerrar"
        });
    });

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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `"${producto.nombre}" agregado al carrito`,
                showConfirmButton: false,
                timer: 1500
            });
            
            document.getElementById("contadorCarrito").textContent = `(${carrito.length})`;
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
