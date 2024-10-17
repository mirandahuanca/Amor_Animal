document.addEventListener("DOMContentLoaded", function() {
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const dni = localStorage.getItem("dni");
    const direccion = localStorage.getItem("direccion");
    const email = localStorage.getItem("email");
    const contraseña = localStorage.getItem("contraseña");

    // Mostrar los datos en la página
    document.getElementById("mostrarNombre").textContent = nombre;
    document.getElementById("mostrarApellido").textContent = apellido;
    document.getElementById("mostrarDNI").textContent = dni;
    document.getElementById("mostrarDireccion").textContent = direccion;
    document.getElementById("mostrarEmail").textContent = email;
    document.getElementById("mostrarContraseña").textContent = contraseña;
});

document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector(".dropdown");
    const content = document.querySelector(".dropdown-content");

    dropdown.addEventListener("click", function() {
        content.style.display = content.style.display === "block" ? "none" : "block";
    });

    // Cierra el contenido si se hace clic fuera de él
    window.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target)) {
            content.style.display = "none";
        }
    });
});
