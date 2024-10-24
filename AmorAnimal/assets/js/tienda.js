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
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">
              <img src="${producto.imagen}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
               <p class="card-text">$${producto.precio}</p>
                <p class="card-text2">Descripcion: ${producto.descripcion}</p>
               <input type="submit" class="btn btn-dark" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">
            </div>
            </div>`;

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
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
               <p class="card-text">$${producto.precio}</p>
                <p class="card-text2">Descripcion: ${producto.descripcion}</p>
                <input type="submit" class="btn btn-dark" class="submitBtn" onclick="eliminarProducto(${index})" value="Eliminar">
            </div>
        </div>`;

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
function publicarProductoUsado() {
    // Declarar las variables primero
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById("imagePreview").src;

    // Expresiones regulares
    const Numeros = /^\d+(\.\d{1,2})?$/; // Solo números y opcionalmente con dos decimales
    const Letras = /^[A-Za-z\s]+$/; // Solo letras y espacios

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
    }

    // Validaciones
    if (!Numeros.test(precio)) {
        alert("El precio debe ser un valor numérico válido.");
    } 
    else if (!Letras.test(descripcion)) {
        alert("La descripción no debe contener números.");
    } 
    else if (imagen === "" || document.getElementById("fileInput").files.length === 0) {
        alert("Debe seleccionar una imagen.");
    } 
    else {
        if (nombre === "" || precio === "" || descripcion === "" || document.getElementById("imagePreview").style.display === "none") {
            alert("Falta completar algún campo");
        } else {
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
    Swal.fire({
        title: "Se agrego el nuevo producto",
        showConfirmButton: true,
        showCloseButton: true,
    });
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
























































































