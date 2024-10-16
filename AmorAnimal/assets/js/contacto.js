// Obtener el formulario y los campos de entrada
const formulario = document.getElementById("formulario");
// Evento cuando se envía el formulario
formulario.addEventListener("submit", function(event) {
    //event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const telefono= document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
   
    console.log(nombre);

    // Verificar si todos los campos están completos
    if (nombre === ""|| telefono === "" ||  email === "" || mensaje === "") {
        alert("Falta completar algún campo ");
    } 
    else {
        Swal.fire({
            title: "Mensaje recibido",
            icon: "success",
            timer: 5000,
        });
    
        formulario.reset(); // Limpia todos los campos del formulario
    }
});

 
