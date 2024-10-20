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



let boton = document.getElementById("boton");

boton.onclick = (e) =>{
    e.preventDefault()
    validacionForm()
    agregaProd()
}