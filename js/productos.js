const divProductos = document.getElementById("divProductos");
const btnLogin = document.getElementById("login");
const BD = JSON.parse(localStorage.getItem("Productos"));
const inputBuscar = document.getElementById("buscar");
//////carrito
const cerrarCarrito = document.getElementById("cerrarCarrito");
const abrirCarrito = document.getElementById("btnCarrito");
const carrito = document.querySelector(".carrito");
import {
  mostrarProdCarrito,
  calcularCantidad,
  eliminarDelCarrito,
  agregarAlCarrito,
  vaciarCarrito,
  comprar
} from "./carrito.js";
import { buscarProd } from "./buscar.js";


inputBuscar.addEventListener("input", (e) => {
  buscarProd(e);
});

///Pintar DB en pantalla/////
if (BD) {
  BD.forEach((e) => {
    let cardProducto = document.createElement("div");
    cardProducto.classList.add("cardProducto");
    cardProducto.innerHTML = `
                <img src="${
                  e.foto || "./assets/productos/productoSinImagen.png"
                }" alt="${e.nombre}">
                <p>${e.nombre}</p>
                <small>${e.caracteristicas}</small>
                <small>${e.dimensiones} cm</small>
                <strong>$ ${e.precio}</strong>        
                <button class="btnAgregar">Agregar al Carrito</button>
`;
    divProductos.appendChild(cardProducto);
  });
}


////Login/////
btnLogin.addEventListener("click", login);


///Numero del carrito/////
const numCarrito = document.querySelector(".carritoLength")
function carritoLength(){
   let db = JSON.parse(localStorage.getItem("carrito"))
   if (db) {
      numCarrito.textContent = db.length
   numCarrito.classList.add("animate__bounce");
  setTimeout(() => {
    numCarrito.classList.remove("animate__bounce");
  }, 600);
   }else{
    numCarrito.textContent = 0
   }
}
carritoLength()
///Animacion cerrar carrito/////
cerrarCarrito.addEventListener("click", () => {
  const container = document.querySelector(".container")
  container.classList.remove("hidden");
  carrito.classList.add("animate__backOutRight");
  carritoLength()
  setTimeout(() => {
    carrito.classList.add("hidden");
  }, 500);
});

///Animacion abrir carrito/////
abrirCarrito.addEventListener("click", () => {
  const container = document.querySelector(".container")
  carrito.classList.remove("hidden");
  carrito.classList.remove("animate__backOutRight");
  setTimeout(() => {
    container.classList.add("hidden");
  }, 1000);
  
  mostrarProdCarrito();
  calcularCantidad();

});

///Accion eliminar del carrito/////
const divCarrito = document.querySelector(".divCarrito");
divCarrito.addEventListener("click", (e) => {
  eliminarDelCarrito(e);
});

///Accion agregar al carrito/////
const cardProducto = document.querySelectorAll(".cardProducto");
let productos = [];

if (cardProducto) {
  cardProducto.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.className == "btnAgregar") {
        ///Guardarlo en localStorage y mostrarlo en pantalla
        const db = JSON.parse(localStorage.getItem("carrito"));
        if (db) {
          if (JSON.stringify(db).indexOf(agregarAlCarrito(e).nombre) > 0) {
            Swal.fire({
              title: "Producto en el carrito",
              icon: "info",
              confirmButtonText: "Aceptar",
              background: `rgba(0,0,0,.9)`,
              color: "rgba(255,255,255,.9)",
            });
          } else {
            db.push(agregarAlCarrito(e));
            localStorage.setItem("carrito", JSON.stringify(db));
          }
        } else {
          productos.push(agregarAlCarrito(e));
          localStorage.setItem("carrito", JSON.stringify(productos));
        }
        mostrarProdCarrito();
        calcularCantidad();
        carritoLength()
      }
    });
  });
}

const iraReg = document.querySelector(".iraReg")
  iraReg.addEventListener("click", (e)=> {
registro()
  })
  
const btnVaciarCarrito = document.querySelector(".vaciarCarrito")
btnVaciarCarrito.addEventListener("click",()=>{
   const db = JSON.parse(localStorage.getItem("carrito"));
   if(db && db.length > 0){
      vaciarCarrito()
   }
   
}
)

comprar()