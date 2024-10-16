function publishP() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    if (nombre==="" || precio==="" || stock==="" ) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
    };

    // Guardar en LocalStorage
    let mascotaPublicada = JSON.parse(localStorage.getItem('mascotaPublicada')) || [];
    mascotaPublicada.push(producto);
    localStorage.setItem('mascotaPublicada', JSON.stringify(mascotaPublicada));

    displaymascotaPublicada();
    alert('La mascota perdida ha sido publicada con éxito.');
}

function displaymascotaPublicada() {
    const mascotaPublicada = JSON.parse(localStorage.getItem('mascotaPublicada')) || [];
    const publishedPetsContainer = document.getElementById('mascotasPublicadas');
    publishedPetsContainer.innerHTML = ''; // Limpiar contenido previo

    mascotaPublicada.forEach((producto, index) => {
        const petElement = document.createElement('div');
        petElement.classList.add('published-pet');
        petElement.innerHTML = `
         <div class="card">
                                  <img src="producto1.jpg" class="card-img-top img-fluid" alt="Producto 1">
                                  <div class="card-body">
                                      <h5 class="card-title">${producto.nombre}</h5>
                                      <p class="card-text">${producto.precio}</p>
                                                <p class="card-text">${producto.stock}</p>
                                      <button class="btn btn-primary">Añadir al carrito</button>
                                  </div>
                              </div>
        `;
        publishedPetsContainer.appendChild(petElement);
    });
}

 // Función para cargar las mascotas publicadas desde localStorage

 let selectedTemplate; // Para almacenar la plantilla seleccionada

 // Función para seleccionar una plantilla y mostrar el formulario

// Función para abrir el selector de archivos
function abrirSelector() {
    document.getElementById("fileInput").click();
}

 // Función para validar y mostrar la imagen seleccionada
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
                imagenVistaPrevia.src = e.target.result; // Establece la fuente de la imagen
                imagenVistaPrevia.style.display = "block"; // Muestra la imagen
            }
            reader.readAsDataURL(archivo); // Lee el archivo como URL de datos
        }
    }
}

 // Función para cargar las mascotas publicadas desde localStorage
function cargarMascotasPublicadas() {
    const mascotasGuardadas = localStorage.getItem("rproductos");
    if (mascotasGuardadas) {
        const mascotas = JSON.parse(mascotasGuardadas);
        mascotas.forEach(mascota => {
            publicarMascota(mascota.nombre, mascota.descripcion, mascota.contacto, mascota.imagen, mascota.plantilla);
        });
    }
}

 // Función para publicar la mascota (y guardarla en localStorage)
function publishP() {
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
    guardarMascota(producto);

    // Publicar la mascota con el estilo de la plantilla seleccionada
    publicarMascota(nombre, precio, stock, imagen);

    // Limpiar el formulario
    document.getElementById("edit-form").reset();
    document.getElementById("imagePreview").style.display = "none"; // Oculta la imagen
    document.getElementById("edit-section").style.display = "none"; // Oculta el formulario
}

 // Función para guardar la mascota en localStorage
function guardarMascota(producto) {
    const mascotasGuardadas = localStorage.getItem("productos");
    let mascotas = mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
    mascotas.push(producto);
    localStorage.setItem("productos", JSON.stringify(mascotas));
}
//AVISO ESTOY SIN EL LIVE, ASI Q NO VEO UN CHOTO DE LA PAGINA

 // Función para mostrar la mascota publicada en el DOM
 function publicarMascota(nombre, precio, stock, imagen) {
    const mascotaDiv = document.createElement("div");
    mascotaDiv.classList.add("published-mascota");

    // Establece el contenido de la mascota publicada
    mascotaDiv.innerHTML = `
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

    document.getElementById("productos").appendChild(mascotaDiv); // Agrega la mascota publicada a la sección
}
// Cargar mascotas al iniciar la página

// Cargar las mascotas publicadas al cargar la página
window.onload = function() {
    displaymascotaPublicada();
};

window.onload = cargarMascotasPublicadas;