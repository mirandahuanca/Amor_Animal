document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formularioLogin").addEventListener("submit", function(event) {
        event.preventDefault(); 
    
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;
    
        const adminEmail= "admin1@gmail.com";
        const adminContraseña = "1234";
        const userEmail = "user1@gmail.com";
        const userContraseña = "2024";
    
    
        if (email === adminEmail && contraseña === adminContraseña) {
            localStorage.setItem("loggedInUser", "Admin");
            Swal.fire({
                title: "¡Bienvenido Administrador!",
                icon: "success",
                timer: 5000,
                showConfirmButton: true,
            }).then(() => {
                esAdmin()
                location.reload();
            });
            limpiarCampos(); 
            
        } else if (email === userEmail && contraseña === userContraseña) {
            localStorage.setItem("loggedInUser", "User1");
            Swal.fire({
                title: "¡Ha iniciado sesión!",
                icon: "success",
                timer: 7000,
                showConfirmButton: true,
            }).then(() => {
                esAdmin();  
            location.reload(); 
            });
            limpiarCampos(); 
            window.location.href = "../../index.html"; 
        } else {
            alert("Email o contraseña son incorrectos");
        }
    });
});

function limpiarCampos() {
    document.getElementById("email").value = "";  
    document.getElementById("contraseña").value = ""; 

};


