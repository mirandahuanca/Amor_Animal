
document.addEventListener("DOMContentLoaded", function() {
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const dni = localStorage.getItem("dni");
    const direccion = localStorage.getItem("direccion");
    const email = localStorage.getItem("email");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");

    // Mostrar los datos en la página
    document.getElementById("mostrarNombre").textContent = nombre;
    document.getElementById("mostrarApellido").textContent = apellido;
    document.getElementById("mostrarDNI").textContent = dni;
    document.getElementById("mostrarDireccion").textContent = direccion;
    document.getElementById("mostrarEmail").textContent = email;
    botonCerrarSesion.style.display = "inline-block";
});

// Manejar múltiples dropdowns
document.querySelectorAll(".dropdown").forEach(dropdown => {
    const content = dropdown.querySelector(".dropdown-content");

    dropdown.addEventListener("click", function(event) {
        event.stopPropagation(); // Evitar que el clic se propague
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

// Cerrar dropdowns si se hace clic fuera de ellos
window.addEventListener("click", function() {
    document.querySelectorAll(".dropdown-content").forEach(content => {
        content.style.display = "none";
    });
});

 



const botonCerrarSesion = document.getElementById("botonCerrarSesion");

botonCerrarSesion.addEventListener("click", function() {
    // Eliminar el usuario de localStorage
    localStorage.removeItem("loggedInUser");

    // Ocultar el botón de cerrar sesión
    botonCerrarSesion.style.display = "none";

    // Redirigir al index.html
    window.location.href = "../../index.html"; 
});

function cargarMascotasPerdidas() {
    const productosGuardados = localStorage.getItem("mascotasPublicadas");
    const contenedor = document.getElementById("mascotasPublicadasUsuario");

    if (productosGuardados) {
        const mascotasPublicadas = JSON.parse(productosGuardados);
        contenedor.innerHTML = ''; // Limpiar el contenido anterior
        if (mascotasPublicadas.length > 0) {
            mascotasPublicadas.forEach((mascota, index) => {
                const mascotaDiv = document.createElement('div');
                mascotaDiv.classList.add('published-pet');
                mascotaDiv.innerHTML = `
                    <h3>Nombre: ${mascota.nombre}</h3>
                    <p>Descripción: ${mascota.descripcion}</p>
                    <p>Teléfono: ${mascota.telefono}</p>
                    <button onclick="eliminarMascota(${index})">Eliminar</button>
                `;
                contenedor.appendChild(mascotaDiv);
            });
        } else {
            contenedor.innerHTML = '<p>No hay mascotas publicadas.</p>';
        }
    } else {
        contenedor.innerHTML = '<p>No hay mascotas publicadas.</p>';
    }
}

function eliminarMascota(index) {
    const productosGuardados = localStorage.getItem("mascotasPublicadas");
    if (productosGuardados) {
        let productos = JSON.parse(productosGuardados);
        productos.splice(index, 1); // Eliminar la mascota seleccionada
        localStorage.setItem("mascotasPublicadas", JSON.stringify(productos));
       cargarMascotasPerdidas(); // Actualizar la lista
    }
}

   cargarMascotasPerdidas(); // Cargar las mascotas al cargar la página
