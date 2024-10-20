class nuevoRegistro {
    constructor(nombre, apellido, dni, email, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.contraseña = contraseña;
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("DNI").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contraseña").value = "";
}

const formulario = document.getElementById("formulario");
const botonAcceso = document.getElementById("botonAcceso");

botonAcceso.onclick = (e) => {
    e.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los campos
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("DNI").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("contraseña").value;

    // Validación de campos vacíos
    if (nombre === "" || apellido === "" || dni === "" || email === "" || contraseña === "") {
        alert("Falta completar algún campo");
    } else {
        // Verificar si hay usuarios en localStorage, si no, inicializar el array
        let usuariosRegistrados;

        if(localStorage.getItem("usuariosRegistrados") == null){
            usuariosRegistrados = [];
        }
        else{
            usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
        }

        // Crear el nuevo usuario y agregarlo a la lista
        let nuevoUsuario = new nuevoRegistro(nombre, apellido, dni, email, contraseña);
        usuariosRegistrados.push(nuevoUsuario);

        // Guardar en localStorage
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

        limpiarCampos();

        // Redirigir a la página de usuario
        window.location.href = "../pages/usuario.html";
    }
}
