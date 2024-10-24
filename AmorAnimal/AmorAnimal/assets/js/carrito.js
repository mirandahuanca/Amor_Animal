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