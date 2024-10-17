// index.js
document.addEventListener("DOMContentLoaded", function() {
    const nombreUser = document.getElementById("botonLogin");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");

    // Verificar si hay un usuario logueado en localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        // Cambiar el texto de 'Iniciar sesión' a 'Hola, User'
        nombreUser.textContent = `Hola, ${loggedInUser}`;
        nombreUser.classList.add("login-link");
        nombreUser.href = "./assets/pages/usuario.html"; // Eliminar el enlace de 'Iniciar sesión'
        botonCerrarSesion.style.display = "inline-block"; // Mostrar botón de cerrar sesión
    } else {
        // Mantener el botón de 'Iniciar sesión' si no hay usuario logueado
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html"; // Enlace al login
    }

    // Evento para cerrar sesión
    botonCerrarSesion.addEventListener("click", function() {
        // Restablecer valores al cerrar sesión
        localStorage.removeItem("loggedInUser");
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html";
        botonCerrarSesion.style.display = "none";
    });
});
