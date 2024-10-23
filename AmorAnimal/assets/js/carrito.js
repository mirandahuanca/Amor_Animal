let iconoCarrito = document.querySelector(".icono-carrito");
let contenedorCarrito = document.querySelector(".contenedor-carrito");
let cerrarCarrito = document.querySelector('#carrito i');

iconoCarrito.onclick = (e) =>{
    e.preventDefault();
    contenedorCarrito.style.display = 'flex';
    contenedorCarrito.style.zIndex = '9999';  
}

cerrarCarrito.onclick = (e) =>{
    e.preventDefault();
    contenedorCarrito.style.display = 'none';
}








function borrarCarrito(){
    let productosAñadidos = document.getElementById("productosAñadidos");
    let contenedorBotones = document.getElementById("botonesCarrito");
    let mensajeVacio = document.getElementById("mensajeCarritoVacio");

    if(localStorage.getItem("productosAñadidos") == null){
        productosAñadidos.style.display = "none";
    }
    else{
        let cont = 0;
        let listaAñadidos = [];
        function cartas(){
            listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));

            let carta= "";
            const contenedorprodAñadidos = document.getElementById("productosAñadidos");
            listaAñadidos.forEach((producto, index) =>{
                carta += `<div class="card" id="producto${index}"">`;
                carta += `<img src="${producto.imagen}" class="card-img-top" alt="...">`;
                    carta += `<div class="card-body">`;
                        carta += `<h5 class="card-title">${producto.nombre}</h5>`;
                        carta += `<p class="card-text">$${producto.precio}</p>`;
                        carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
                    carta += `</div>`;
                carta += `</div>`;

                cont = index;
            });
            
            contenedorprodAñadidos.innerHTML = carta;
        }

        document.onload = cartas();
        mensajeVacio.style.display = "none";
        contenedorBotones.style.display = "block";
        productosAñadidos.style.display = "block";
    }
}

borrarCarrito();



function borrarProductosAñadidos(){
    let productosAñadidos = document.getElementById("productosAñadidos");
    let mensajeVacio = document.getElementById("mensajeCarritoVacio");

    mensajeVacio.style.display = "block";
    productosAñadidos.style.display = "none";
}



let botonF = document.getElementById("botonFinalizarCompra");
let botonV = document.getElementById("botonVaciar");

botonF.onclick = (e) =>{
    e.preventDefault();
    Swal.fire({
        title: 'GRACIAS POR SU COMPRA',
    });
    
    localStorage.removeItem("productosAñadidos");

    borrarProductosAñadidos()    
}

botonV.onclick = (e) =>{
    e.preventDefault()

    localStorage.removeItem("productosAñadidos");

    borrarProductosAñadidos()
}
