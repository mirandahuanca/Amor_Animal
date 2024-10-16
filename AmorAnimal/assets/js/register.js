// Obtener el formulario y los campos de entrada
const formulario = document.getElementById("formulario");
// Evento cuando se envía el formulario
formulario.addEventListener("submit", function(event) {
    //event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("DNI").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();

    // Verificar si todos los campos están completos
    if (nombre === ""|| apellido === "" ||  dni === "" || usuario === "" || contraseña === "") {
        alert("Falta completar algún campo ");
    } 
    else {
        Swal.fire({
            title: "¡Resgistro exitosamente!",
            icon: "success",
            timer: 5000,
        });
    
        formulario.reset(); // Limpia todos los campos del formulario
    }
});

 
