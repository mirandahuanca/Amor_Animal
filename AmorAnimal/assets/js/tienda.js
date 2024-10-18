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


// Función para cargar las mascotas publicadas desde localStorage
function CargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados);
        productos.forEach(producto => {
            publicarProducto(producto.nombre, producto.precio, producto.stock, producto.imagen);
        });
    }
}


 // Función para publicar la mascota (y guardarla en localStorage)
 function publishP() {
    if (!verificarLogin()) {
        Swal.fire({
            icon: "error",
            title: "Usted no ha iniciado sesión",
            text: "¿No tiene cuenta?",
            footer: '<a href="register.html">Registrate Aquí</a>'
          });
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    const imagen = document.getElementById("imagePreview").src;

    // Crear objeto para la mascota
    const producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        imagen: imagen,
    };

    // Guardar en localStorage
    guardarProducto(producto);

    // Publicar la mascota con el estilo de la plantilla seleccionada
    publicarProducto(nombre, precio, stock, imagen);

    // Limpiar el formulario
    document.getElementById("edit-form").reset();
    document.getElementById("imagePreview").style.display = "none"; // Oculta la imagen
    document.getElementById("edit-section").style.display = "none"; // Oculta el formulario
}



// Función para guardar el producto en localStorage
function guardarProducto(producto) {
    const productosGuardados = localStorage.getItem("productos");
    let productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para mostrar producto publicado en el DOM
function publicarProducto(nombre, precio, stock, imagen) {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("published-mascota");

    // Establece el contenido del producto publicado
    productoDiv.innerHTML = `
        <div class="card">
            <img src="${imagen}" class="card-img-top img-fluid" alt="Producto Imagen">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Precio: ${precio}</p>
                <p class="card-text">Stock: ${stock}</p>
                <button class="btn btn-primary">Añadir al carrito</button>
            </div>
        </div>
    `;

    document.getElementById("productos").appendChild(productoDiv);  
}

// Cargar productos al iniciar la página

// Cargar las mascotas publicadas al cargar la página
window.onload = function() {
    displayProductosPublicados();
};

window.onload = CargarProductosPublicados;
function verificarLogin() {
    const usuarioLogueado = localStorage.getItem("loggedInUser");
    return usuarioLogueado !== null;
}

window.onload = function() {
    if (!verificarLogin()) {
        // Deshabilitar botón de crear folleto
        const crearFolletoButton = document.querySelector('.crearFolleto-button');
        crearFolletoButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el enlace
            Swal.fire({
                icon: "error",
                title: "Usted no ha iniciado sesión",
                text: "¿No tiene cuenta?",
                footer: '<a href="register.html">Registrate Aquí</a>'
              });
        });

        // Deshabilitar botón de publicar producto
        const publicarButton = document.querySelector('button[onclick="publishP()"]');
        publicarButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar la acción de publicación
          
         
        });
    } else {
       
        displayProductosPublicados(); // Cargar los productos publicados si está logueado
    }
};
