function selectTemplate(templateId) {
    const templates = document.querySelectorAll('.template');
    templates.forEach(template => template.style.border = 'none');
    
    const selectedTemplate = document.getElementById(templateId);
    selectedTemplate.style.border = '3px solid #2cbdf2';
    
    document.getElementById('edit-section').style.display = 'block';
    
    const templateHTML = selectedTemplate.innerHTML;
    document.getElementById('selected-template').innerHTML = templateHTML;
}

function publishPet() {
    const name = document.getElementById('pet-name').value;
    const description = document.getElementById('pet-description').value;
    const contact = document.getElementById('contact-info').value;

    if (!name || !description || !contact) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const mascota = {
        name: name,
        description: description,
        contact: contact,
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
            <h3>Nombre: ${pet.name}</h3>
            <p>Descripción: ${pet.description}</p>
            <p>Contacto: ${pet.contact}</p>
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
     document.getElementById("selected-template").innerText = "Plantilla seleccionada: " + nombrePlantilla;
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
             publicarMascota(mascota.nombre, mascota.descripcion, mascota.contacto, mascota.imagen, mascota.plantilla);
         });
     }
 }

 // Función para publicar la mascota (y guardarla en localStorage)
 function publishPet() {
     const nombre = document.getElementById("pet-name").value;
     const descripcion = document.getElementById("pet-description").value;
     const contacto = document.getElementById("contact-info").value;
     const imagen = document.getElementById("imagePreview").src;

     // Crear objeto para la mascota
     const mascota = {
         nombre: nombre,
         descripcion: descripcion,
         contacto: contacto,
         imagen: imagen,
         plantilla: selectedTemplate
     };

     // Guardar en localStorage
     guardarMascota(mascota);

     // Publicar la mascota con el estilo de la plantilla seleccionada
     publicarMascota(nombre, descripcion, contacto, imagen, selectedTemplate);

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

 // Función para mostrar la mascota publicada en el DOM
function publicarMascota(nombre, descripcion, contacto, imagen, plantilla) {
    const mascotaDiv = document.createElement("div");
    mascotaDiv.classList.add("published-mascota");

    // Aplica el estilo de la plantilla seleccionada
    switch (plantilla) {
        case 'Plantilla 1':
            mascotaDiv.classList.add("template1");
            break;
        case 'Plantilla 2':
            mascotaDiv.classList.add("template2");
            break;
        case 'Plantilla 3':
            mascotaDiv.classList.add("template3");
            break;
        default:
            break;
    }

    // Establece el contenido de la mascota publicada
    mascotaDiv.innerHTML = `
        <h3>${nombre}</h3>
        <img src="${imagen}" alt="Imagen de la mascota" style="max-width: 150px; display: block;">
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Contacto:</strong> ${contacto}</p>
    `;

    document.getElementById("mascotasPublicadas").appendChild(mascotaDiv); // Agrega la mascota publicada a la sección
}


// Cargar mascotas al iniciar la página

// Cargar las mascotas publicadas al cargar la página
window.onload = function() {
    displaymascotaPublicada();
};

window.onload = cargarMascotasPublicadas;