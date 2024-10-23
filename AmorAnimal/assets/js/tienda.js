class Producto{
    constructor(imagen, nombre, precio, descripcion){
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

let cont = 0;
let listaProductos;

function cargarProductosActuales(){
    if(localStorage.getItem("productos") == null){
        listaProductos = [];
    }
    else{
        listaProductos = JSON.parse(localStorage.getItem("productos"));
    }

    let carta= "";
    const contenedorproductos = document.getElementById("productosPublicadosUsuario");
    listaProductos.forEach((producto, index) =>{
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">`;
        carta += `<img src="${producto.imagen}" class="card-img-top" alt="...">`;
            carta += `<div class="card-body">`;
                carta += `<h5 class="card-title">${producto.nombre}</h5>`;
                carta += `<p class="card-text">$${producto.precio}</p>`;
                carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
                carta += `<input type="submit" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">`;
            carta += `</div>`;
        carta += `</div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;


    //Añade productos al carrito (array en local storage)
    let listaAñadidos;

    if(localStorage.getItem("productosAñadidos") == null){
        listaAñadidos = [];
    }
    else{
        listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));
    }
    

    for (let i = 0; i<cont+1; i++){
        let botonañadir = document.getElementById("botonañadir" + i);

        botonañadir.onclick = (e) =>{
            e.preventDefault()

            listaProductos = JSON.parse(localStorage.getItem("productos"));

            let producto = new Producto(listaProductos[i].imagen, listaProductos[i].nombre, listaProductos[i].precio, listaProductos[i].descripcion);

            listaAñadidos.push(producto);

            localStorage.setItem("productosAñadidos", JSON.stringify(listaAñadidos));
        }
    }
}

let formProductos = document.getElementById("formProductoNuevo");
let productosParaEditar = document.querySelector('.productosParaEditar');
let productosParaComprar = document.querySelector('.productosParaComprar');

function productosActuales(){
    // Obtener el valor real de display usando getComputedStyle
    const displayActual = window.getComputedStyle(formProductos).display;
    if(displayActual === "none"){
        productosParaEditar.style.display = "none";
        productosParaComprar.style.display = "block";
        cargarProductosActuales();
    }
    else if(displayActual === "block"){
        productosParaEditar.style.display = "block";
        productosParaComprar.style.display = "none";
    }
}

productosActuales();





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









function abrirSelector() {
    document.getElementById("fileInput").click();
}

function validarArchivo(input) {
    const archivo = input.files[0];
    if (archivo) {
        const tipoArchivo = archivo.type;
        if (tipoArchivo !== "image/jpeg") {
            alert("El archivo seleccionado no es de tipo .jpg");
            input.value = ""; // Resetea el campo de archivo
        } else {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imagenVistaPrevia = document.getElementById("imagePreview");
                imagenVistaPrevia.src = e.target.result;
                imagenVistaPrevia.style.display = "block";
            }
            reader.readAsDataURL(archivo); // Lee el archivo como URL de datos
        }
    }
}





// Función para mostrar producto publicado en el DOM
function publicarProducto() {
    if(localStorage.getItem("productos") == null){
        listaProductos = [];
    }
    else{
        listaProductos = JSON.parse(localStorage.getItem("productos"));
    }

    let carta= "";
    const contenedorproductos = document.getElementById("productos");
    listaProductos.forEach((producto, index) =>{
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">`;
        carta += `<img src="${producto.imagen}" class="card-img-top" alt="...">`;
            carta += `<div class="card-body">`;
                carta += `<h5 class="card-title">${producto.nombre}</h5>`;
                carta += `<p class="card-text">$${producto.precio}</p>`;
                carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
                carta += `<input type="submit" class="submitBtn" onclick="eliminarProducto(${index})" value="Eliminar">`;
            carta += `</div>`;
        carta += `</div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;
}

document.onload = publicarProducto();


// Función para guardar el producto en localStorage
function guardarProducto(producto) {
    const productosGuardados = localStorage.getItem("productos");
    let productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}



function verificarLogin() {
    const usuarioLogueado = localStorage.getItem("loggedInUser");
    return usuarioLogueado !== null;
}

 // Función para publicar la mascota (y guardarla en localStorage)
function publicarProductoUsado() {
    if (!verificarLogin()) {
        Swal.fire({
            icon: "error",
            title: "Usted no ha iniciado sesión",
            text: "¿No tiene cuenta?",
            showConfirmButton: false,
            showCloseButton: true, 
            footer: '<a href="register.html">Registrate Aquí</a>'
        });
        return;
    }else{
        const imagen = document.getElementById("imagePreview").src;
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;

        if (nombre === "" || precio === "" || descripcion === "" || document.getElementById("imagePreview").style.display === "none") {
            alert("Falta completar algún campo");
        }
        else{
            // Crear objeto para el producto
            const producto = {
                nombre: nombre,
                precio: precio,
                descripcion: descripcion,
                imagen: imagen,
            };
        
            // Guardar en localStorage
            guardarProducto(producto);
        
            // Publicar el producto con el estilo de la plantilla seleccionada
            publicarProducto();
        
            // Limpiar el formulario
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("imagePreview").style.display = "none"; // Oculta la imagen
        }
    }
}


function eliminarProducto(index) {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        let productos = JSON.parse(productosGuardados);
        // Eliminar el producto seleccionado
        productos.splice(index, 1);
        // Guardar nuevamente en localStorage
        localStorage.setItem("productos", JSON.stringify(productos));
        publicarProducto(); // Recargar la lista
    }
}

/*
// index.js
document.addEventListener("DOMContentLoaded", function() {
    const nombreUser = document.getElementById("botonLogin");
    //const botonCerrarSesion = document.getElementById("botonCerrarSesion"); 

    // Verificar si hay un usuario logueado en localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        // Cambiar el texto de 'Iniciar sesión' a 'Hola, User'
        nombreUser.textContent = `Hola, ${loggedInUser}`;
        nombreUser.classList.add("login-link");
        nombreUser.href = "./usuario.html"; // Eliminar el enlace de 'Iniciar sesión'
      //  botonCerrarSesion.style.display = "inline-block"; // Mostrar botón de cerrar sesión
    } else {
        // Mantener el botón de 'Iniciar sesión' si no hay usuario logueado
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html"; // Enlace al login
    }
    /*
    // Evento para cerrar sesión
    botonCerrarSesion.addEventListener("click", function() {
        // Restablecer valores al cerrar sesión
        localStorage.removeItem("loggedInUser");
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html";
        botonCerrarSesion.style.display = "none";
    });
    
});

*/




















































/*
// Selecciona todas las cartas de productos
let productCards = document.querySelectorAll('.card');

// Crear un array vacío para almacenar los productos
let productsArray = [];

// Recorre cada tarjeta de producto y extrae la información
for (let i = 0; i < productCards.length; i++) {
    let card = productCards[i];
    
    // Extraer los detalles del producto
    let name = card.querySelector('.card-title').innerText;
    let price = card.querySelector('.card-price').innerText;
    let descripcion = card.querySelector('.card-descripcion').innerText;
    let image = card.querySelector('img').src;
    
    // Crear un objeto con los datos del producto
    let product = {
        name: name,
        price: price,
        descripcion: descripcion,
        image: image
    };

    // Agregar el objeto al array de productos
    productsArray.push(product);
}

// Mostrar el array en la consola
console.log(productsArray);
*/
/*
// Función para cargar las mascotas publicadas desde localStorage
function CargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados);
        productos.forEach(producto => {
            publicarProducto(producto.nombre, producto.precio, producto.descripcion, producto.imagen);
        });
    }
}*/



/*
function cargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    const contenedor = document.getElementById("productosPublicadosUsuario");
    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados);
        productos.forEach((producto, index) => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-fluid" alt="Producto Imagen">
                <h3>${producto.nombre}</h3>
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            contenedor.appendChild(productoDiv);
        });
    } else {
        contenedor.innerHTML = '<p>No hay productos publicados.</p>';
    }
}

window.onload = CargarProductosPublicados;
*/











































/*
class Producto{
    constructor(nombre, precio, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}



function validacionForm(){
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;

    if (isNaN(precio) && isNaN(stock)){
        alert("No puede ingresar letras en el precio y stock, debe ingresar numeros.")
        return false;
    }
    else{
        if(isNaN(precio)){
            alert("No puede ingresar letras en el precio, debe ingresar numeros.")
            return false;
        }
        else{
            if(isNaN(stock)){
                alert("No puede ingresar letras en el stock, debe ingresar numeros.")
                return false;
            }
        }
    }


    if(nombre == "" || precio == "" || stock == ""){
        alert("El formulario está incompleto.")
        return false;
    }

    return true;
}







let cont = 0;
function cartas(){

    if(localStorage.getItem("productos") == null){
        listaProductos = [];
    }
    else{
        listaProductos = JSON.parse(localStorage.getItem("productos"));
    }
    
    
    
    

    let carta= "";
    const contenedorproductos = document.getElementById("productos");
    listaProductos.forEach((producto, index) =>{
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">`;
        carta += `<img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="...">`;
            carta += `<div class="card-body">`;
                carta += `<h5 class="card-title">${producto.nombre}</h5>`;
                carta += `<p class="card-text">$${producto.precio}</p>`;
                carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
                carta += `<input type="submit" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">`;
            carta += `</div>`;
        carta += `</div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;


    

    let listaAñadidos;

    if(localStorage.getItem("productosAñadidos") == null){
        listaAñadidos = [];
    }
    else{
        listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));
    }
    

    for (let i = 0; i<cont+1; i++){
        let botonañadir = document.getElementById("botonañadir" + i);

        botonañadir.onclick = (e) =>{
            e.preventDefault()

            listaProductos = JSON.parse(localStorage.getItem("productos"));

            let producto = new Producto(listaProductos[i].nombre, listaProductos[i].precio, listaProductos[i].descripcion);

            listaAñadidos.push(producto);

            localStorage.setItem("productosAñadidos", JSON.stringify(listaAñadidos));
        }
    }
}

document.onload = cartas();






const formProductos = document.getElementById("formulario");

function esAdmin(){
    let adminActivo = localStorage.getItem("Administrador");
    
    if(adminActivo == "ACTIVO"){
        formProductos.style.display = "block";
    }
    else{
        formProductos.style.display = "none";
    }
}

esAdmin();








function agregaProd(){
    if (validacionForm() == true){

        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let stock = document.getElementById("stock").value;

        listaProductos = JSON.parse(localStorage.getItem("productos"));

        let prod = new Producto(nombre, precio, stock);
    
        listaProductos.push(prod);

        localStorage.setItem("productos", JSON.stringify(listaProductos));
        cartas();
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
    }
    
}



let boton = document.getElementById("botonPublicarProducto");

boton.onclick = (e) =>{
    e.preventDefault()
    validacionForm()
    agregaProd()
}*/