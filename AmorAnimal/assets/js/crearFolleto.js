function seleccionarPlantilla(templateId) {
    const templates = document.querySelectorAll('.template');
    templates.forEach(template => template.style.border = 'none');
    
    const selectedTemplate = document.getElementById(templateId);
    selectedTemplate.style.border = '2px solid red'; // Resaltar la plantilla seleccionada
    
    document.getElementById('edit-section').style.display = 'block';

}

function publishPet() {
    if (!verificarLogin()) {
        alert("Debes iniciar sesión para publicar una mascota.");
        return;
    }

    const nombre = document.getElementById('pet-nombre').value;
    const descripcion = document.getElementById('pet-descripcion').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre === "" || descripcion === "" || telefono === "") {
        alert('Por favor, completa todos los campos.');
        return;
    }
    const mascota = {
        nombre: nombre,
        descripcion: descripcion,
       telefono:telefono,
    };

    // Guardar en LocalStorage
    let mascotaPublicada = JSON.parse(localStorage.getItem('mascotaPublicada')) || [];
    mascotaPublicada.push(mascota);
    localStorage.setItem('mascotaPublicada', JSON.stringify(mascotaPublicada));

    displaymascotaPublicada();
    alert('La mascota perdida ha sido publicada con éxito.');
}

function displaymascotaPublicada() {
    const mascotaPublicada = JSON.parse(localStorage.getItem('mascotaPublicada')) || [];
    const publishedPetsContainer = document.getElementById('mascotasPublicadas');
    publishedPetsContainer.innerHTML = ''; // Limpiar contenido previo

    mascotaPublicada.forEach((pet, index) => {
        const petElement = document.createElement('div');
        petElement.classList.add('published-pet');
        petElement.innerHTML = `
            <h3>Nombre: ${pet.nombre}</h3>
            <p>Descripción: ${pet.descripcion}</p>
            <p>telefono: ${pet.telefono}</p>
        `;
        publishedPetsContainer.appendChild(petElement);
    });
}

 // Función para cargar las mascotas publicadas desde localStorage

 let selectedTemplate; // Para almacenar la plantilla seleccionada

 // Función para seleccionar una plantilla y mostrar el formulario
function seleccionarPlantilla(nombrePlantilla) {
    selectedTemplate = nombrePlantilla; // Guardar la plantilla seleccionada

    // Muestra el formulario de edición
    document.getElementById("edit-section").style.display = "block"; 
  
}

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
    const mascotasGuardadas = localStorage.getItem("mascotasPublicadas");
    if (mascotasGuardadas) {
        const mascotas = JSON.parse(mascotasGuardadas);
        mascotas.forEach(mascota => {
            publicarMascota(mascota.nombre, mascota.descripcion, mascota.telefono, mascota.imagen, mascota.plantilla);
        });
    }
}


function publishPet() {
    const nombre = document.getElementById("pet-nombre").value;
    const descripcion = document.getElementById("pet-descripcion").value;
    const telefono = document.getElementById("telefono").value;
    const imagen = document.getElementById("imagePreview").src;

    if (!nombre || !descripcion || !telefono || !selectedTemplate) {
        alert('Por favor, completa todos los campos y selecciona una plantilla.');
        return;
    }

    // Crear objeto para la mascota
    const mascota = {
        nombre: nombre,
        descripcion: descripcion,
        telefono: telefono,
        imagen: imagen,
        plantilla: selectedTemplate
    };

    // Guardar en localStorage
    guardarMascota(mascota);

    // Publicar la mascota con el estilo de la plantilla seleccionada
    publicarMascota(nombre, descripcion, telefono, imagen, selectedTemplate);

    // Limpiar el formulario
    document.getElementById("edit-form").reset();
    document.getElementById("imagePreview").style.display = "none"; // Oculta la imagen
    document.getElementById("edit-section").style.display = "none"; // Oculta el formulario
    
}

 // Función para guardar la mascota en localStorage
function guardarMascota(mascota) {
    const mascotasGuardadas = localStorage.getItem("mascotasPublicadas");
    let mascotas = mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
    mascotas.push(mascota);
    localStorage.setItem("mascotasPublicadas", JSON.stringify(mascotas));
}

// Función para publicar una mascota con la plantilla seleccionada
function publicarMascota(nombre, descripcion, telefono, imagen, plantilla) {
    const mascotaDiv = document.createElement("div");
    mascotaDiv.classList.add("published-mascota");

    const imagenElement = document.createElement("img");
    imagenElement.src = imagen;
    imagenElement.style.maxWidth = "150px";
    imagenElement.style.display = "block";

    switch (plantilla) {
        case 'Plantilla 1':
            mascotaDiv.classList.add("template1");
            imagenElement.classList.add("formaCorazon");
            break;
        case 'Plantilla 2':
            mascotaDiv.classList.add("template2");
            imagenElement.classList.add("formaEstrella");
            break;
        case 'Plantilla 3':
            mascotaDiv.classList.add("template3");
            imagenElement.classList.add("formaRedonda");
            break;
        default:
            break;
    }

    mascotaDiv.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
    `;
    mascotaDiv.appendChild(imagenElement);
    document.getElementById("mascotasPublicadas").appendChild(mascotaDiv);
}

// Cargar las mascotas publicadas al cargar la página
window.onload = function() {
    displaymascotaPublicada();
    verificarLogin();
   
};

// Cargar las mascotas publicadas al cargar la página
window.onload = function() {
    cargarMascotasPublicadas(); // Siempre cargar los folletos publicados
};
function verificarLogin() {
    const usuarioLogueado = localStorage.getItem("loggedInUser");
    return usuarioLogueado !== null;
  
}

window.onload = function() {
    cargarMascotasPublicadas();
    if (!verificarLogin()) {
        // Deshabilitar botón de crear folleto
        const crearFolletoButton = document.querySelector('.crearFolleto-button');
        crearFolletoButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el enlace
           alert("Debe iniciar sesión para crear el folleto");
        });

        
    } else {
        cargarMascotasPublicadas(); // Cargar las mascotas publicadas si está logueado
      // Cargar los productos publicados si está logueado
    }
};
