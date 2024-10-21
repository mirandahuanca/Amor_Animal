class Producto{
    constructor(nombre, precio, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

function validacionForm() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (nombre === "" || precio === "" || descripcion === "") {
        alert("El formulario está incompleto.");
        return false;
    }

    if (isNaN(precio)) {
        alert("El precio debe ser un número.");
        return false;
    }

    return true;
}

let listaProductos;
/*
async function getProducts(){    
    let listaProductos = [
        { nombre: "DANVOUY Womens T Shirt Casual Cotton Short", precio: 12.99, stock: 145 },
        { nombre: "Opna Women's Short Sleeve Moisture", precio: 7.95, stock: 146 },
        { nombre: "MBJ Women's Solid Short Sleeve Boat Neck V", precio: 9.85, stock: 679 },
    ];

    try{
        let response = await fetch("https://fakestoreapi.com/products?limit=4");
        response = await response.json();
        response.forEach((producto) =>{
            let productoActual = {
                nombre: producto.title,
                precio: producto.price,
                stock: producto.rating.count,
            }

            listaProductos.push(productoActual);
            localStorage.setItem("productos", JSON.stringify(listaProductos));
            listaProductos = JSON.parse(localStorage.getItem("productos"));            
        });
    }
    catch(error){
        console.log(error);
    }
}
*/



let cont = 0;




let formProductos = document.getElementById("formProductoNuevo");


function esAdmin() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    console.log("Usuario logueado:", loggedInUser);  // Esto nos dice qué usuario está logueado

    if (loggedInUser === "Admin") {
        console.log("El usuario es admin, mostrando el formulario");
        formProductos.style.display = "block";// Mostrar el formulario
    } else if(loggedInUser === "User1") {
        console.log("El usuario no es admin, ocultando el formulario");
        formProductos.style.display = "block"; // Ocultar el formulario
    }
}
esAdmin();

function agregaProd() {
    if (validacionForm()) {
        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let descripcion = document.getElementById("descripcion").value;

        // Obtener la lista de productos desde localStorage o inicializarla
        listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

        // Crear un nuevo producto
        let prod = new Producto(nombre, precio, descripcion);
    
        // Agregar el producto a la lista
        listaProductos.push(prod);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem("productos", JSON.stringify(listaProductos));
        
        // Actualizar la vista
        publishP(); 
        
        // Limpiar el formulario
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
    }
}

function publishP() {
    // Obtener la lista de productos desde localStorage
    listaProductos = JSON.parse(localStorage.getItem("productos")) || []; // Inicializar en caso de null
    
    let carta = "";
    const contenedorproductos = document.getElementById("productos");
    contenedorproductos.innerHTML = ""; // Limpiar el contenedor antes de añadir nuevos productos
    listaProductos.forEach((producto, index) => {
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">`;
        carta += `<img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="...">`;
        carta += `<div class="card-body">`;
        carta += `<h5 class="card-title">${producto.nombre}</h5>`;
        carta += `<p class="card-text">$${producto.precio}</p>`;
        carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
        carta += `<input type="submit" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">`;
        carta += `</div>`;
        carta += `</div>`;
    });
    
    contenedorproductos.innerHTML = carta; // Añadir los productos al contenedor
}


document.onload = publishP();



let boton = document.getElementById("boton");

boton.onclick = (e) =>{
    e.preventDefault()
    validacionForm()
    agregaProd()
    publishP(); 
}

    
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
      //  botonCerrarSesion.style.display = "inline-block"; // Mostrar botón de cerrar sesión
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
esAdmin();