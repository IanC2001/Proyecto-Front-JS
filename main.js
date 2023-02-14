document.getElementById("bg");

class Producto {
    constructor(id, nombre,precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const nike1 = new Producto (1, "Zapatillas Nike Air Force 1 High ", 24000, "../img/main/nike1.jpg");
const nike2 = new Producto (2, "Zapatillas Nike Force 1 ", 23500, "../img/main/nike2.jpg");
const nike3 = new Producto (3, "Zapatillas Nike Air Force 1 07 ", 22000, "../img/main/nike3.jpg");
const nike4 = new Producto (4, "Zapatillas Nike Air More", 21000, "../img/main/nike4.jpg");
const nike5 = new Producto (5, "Zapatillas Nike Waffle One", 18000, "../img/main/nike5.jpg");
const nike6 = new Producto (6, "Zapatillas Nike Court Legacy", 27000, "../img/main/nike6.jpg");
const nike7 = new Producto (7, "Zapatillas Nike Blazer Low", 21000, "../img/main/nike7.jpg");
const nike8 = new Producto (8, "Zapatillas Nike Blazer Low", 12000, "../img/main/nike8.jpg");
const nike9 = new Producto (9, "Zapatillas Nike Toggle", 16000, "../img/main/nike9.jpg");
const nike10 = new Producto (10, "Zapatillas Nike Af1 ", 19000, "../img/main/nike10.jpg");
const nike11 = new Producto (11, "Zapatillas Nike Waffle One ", 29000, "../img/main/nike11.jpg");
const nike12 = new Producto (12, "Zapatillas Nike Dunk Low", 34000, "../img/main/nike12.jpg");

const productos = [ nike1, nike2 ,nike3 ,nike4 ,nike5 ,nike6 ,nike7 ,nike8 ,nike9 ,nike10 ,nike11 ,nike12];


let carritos = [];
if(localStorage.getItem("carritos")){
    carritos = JSON.parse(localStorage.getItem("carritos"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

//Mostrar productos

const mostrarProductos = () => {
    productos.forEach( producto =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class=" card cardd ">
            <img src="${producto.img}" class="imgProductos text-center container" alt="${producto.nombre}">
            <div class="card-body">
            <h3 class="text-center"> ${producto.nombre}</h3>
            <p class="text-center">$${producto.precio}</p>
            <button class="btn" id="boton${producto.id}">Agregar al Carrito</button>
            </div>
        </div>
        `
        contenedorProductos.appendChild(card);

        //Agregar prod al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click",() =>{
            console.log(producto.id);
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

//Agregar prod al carrito

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carritos.find(producto => producto.id === id); 
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else{
        const product = productos.find(producto => producto.id === id);
        carritos.push(product);
        localStorage.setItem("carritos", JSON.stringify(carritos));
    }
    mostrarCarrito();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");

//Total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carritos.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML =   `$${totalCompra}`;
}

//Mostrar carrito
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    calcularTotal(); 
    carritos.forEach(producto =>{
    const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="  card cardd">
            <img src="${producto.img}" class="imgProductos" alt="${producto.nombre}">
            <div class="card-body">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <button  class="btn" id="eliminar${producto.id}">Eliminar del Carrito</button>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(card);

    //Eliminar producto del carrito
    const botonEliminar = document.getElementById(`eliminar${producto.id}`);
    botonEliminar.addEventListener("click", () => {
    eliminarDelCarrito(producto.id);
    })
    })
}
mostrarCarrito();

const eliminarDelCarrito = (id) => {
    const producto = carritos.find (producto => producto.id === id);
    const indice = carritos.indexOf(producto);
    carritos.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carritos",JSON.stringify(carritos));
}

//Vaciar carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click",() => {
    localStorage.removeItem("carritos");
    carritos = [];
    mostrarCarrito();
})

