let formularioCreacionProductos = document.querySelector(".formProductoNuevo");
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    // Datos de ejemplo para validar el login
    const adminEmail= "admin1@gmail.com";
    const adminContraseña = "1234";
    const userEmail = "user1@gmail.com";
    const userContraseña = "2024";

    
    if (email === adminEmail && contraseña === adminContraseña) {
        localStorage.setItem("loggedInUser", "Admin");
        limpiarCampos(); 
        Swal.fire({
            title: "¡Bienvenido Administrador!",
            icon: "success",
            timer: 5000,
        });
        formularioCreacionProductos.style.display = 'block';
   
    } else if (email === userEmail && contraseña === userContraseña) {
        localStorage.setItem("loggedInUser", "User1");
        limpiarCampos(); 
        Swal.fire({
            title: "¡Ha iniciado sesion!",
            icon: "success",
            timer: 5000,
        });
        formularioCreacionProductos.style.display = 'block';
    } else {
        alert("Email o contraseña incorrectos");
    }
    
});

function limpiarCampos() {
    document.getElementById("email").value = "";  
    document.getElementById("contraseña").value = ""; 

}
