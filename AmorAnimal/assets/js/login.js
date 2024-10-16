const adminUsuario = "admin";
const adminContraseña = "1234";

// Obtener el formulario y el área donde se mostrará el mensaje de bienvenida
const formulario = document.getElementById("formulario");
const mensajeBienvenida = document.getElementById("mensajeBienvenida");
// Añadir un evento al formulario para validar los datos de acceso
formulario.addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos de usuario y contraseña
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Validar si el usuario y contraseña son correctos
    if (usuario === adminUsuario  && contraseña === adminContraseña) {
        mensajeBienvenida.textContent = "Bienvenido, Admin!";
        mensajeBienvenida.style.color = "black";
    
        formulario.reset(); // Limpia todos los campos del formulario

    } else if(usuario==="" || contraseña==="") {
       alert("Falta completar algún campo")
    }
    else{
        alert("usuario o contraseña son incorrectos")
       
            formulario.reset(); // Limpia todos los campos del formulario
     
    }
});

