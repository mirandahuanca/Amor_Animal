const adminUsername = "admin";
const adminPassword = "1234";

// Obtener el formulario y el área donde se mostrará el mensaje de bienvenida
const formulario = document.getElementById("formulario");
const mensajeBienvenida = document.getElementById("mensajeBienvenida");

// Añadir un evento al formulario para validar los datos de acceso
formulario.addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos de usuario y contraseña
    const usuario = document.getElementById("usuario").value;
    const contra = document.getElementById("contra").value;

    // Validar si el usuario y contraseña son correctos
    if (usuario === adminUsername && contra === adminPassword) {
        mensajeBienvenida.textContent = "Bienvenido, Admin!";
        mensajeBienvenida.style.color = "black";
    } else {
       alert("Usuario o contraseña son incorrectos")
    }
});

botonLimpiar.addEventListener("click", function() {
    formulario.reset(); // Limpia todos los campos del formulario
});