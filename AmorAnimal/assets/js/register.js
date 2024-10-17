// Obtener el formulario y los campos de entrada
const formulario = document.getElementById("formulario");

// Evento cuando se envía el formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("DNI").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();

    // Verificar si todos los campos están completos
    if (nombre === "" || apellido === "" || dni === "" || direccion === "" || email === "" || contraseña === "") {
        alert("Falta completar algún campo");
    } else {
        Swal.fire({
            title: "¡Registro exitoso!",
            icon: "success",
            timer: 5000,
        });
        // Guardar los datos en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("dni", dni);
        localStorage.setItem("direccion", direccion);
        localStorage.setItem("email", email);
        localStorage.setItem("contraseña", contraseña); // Si decides encriptarla, sería mejor

        Swal.fire({
            title: "¡Registro exitoso!",
            icon: "success",
            timer: 5000,
        });
      limpiarCampos();

        // Redirigir a la página donde se mostrarán los datos
        //window.location.href = "./mostrarDatos.html";
    }

});

function limpiarCampos() {
    document.getElementById("nombre").value = "";  
    document.getElementById("apellido").value = "";  
    document.getElementById("dni").value = "";  
    document.getElementById("direccion").value = "";  
    document.getElementById("email").value = "";  
    document.getElementById("contraseña").value = ""; 

}