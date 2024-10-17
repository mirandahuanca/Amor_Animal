document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar el envío del formulario por defecto

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    // Datos de ejemplo para validar el login
    const adminUsuario = "admin";
    const adminContraseña = "1234";
    const emailuser = "user1";
    const contraseñaUser = "2024";

    if (email === adminUsuario && contraseña === adminContraseña) {
        localStorage.setItem("loggedInUser", "Admin");
        limpiarCampos(); 
   
   
    } else if (email === emailuser && contraseña === contraseñaUser) {
        localStorage.setItem("loggedInUser", "User1");
        limpiarCampos(); 
   
    } else {
        alert("Email o contraseña incorrectos");
    }
    
});

function limpiarCampos() {
    document.getElementById("email").value = "";  
    document.getElementById("contraseña").value = ""; 

}