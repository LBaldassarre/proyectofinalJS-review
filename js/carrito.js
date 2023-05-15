import { ProductoCarrito } from "./clases/Producto.js";

export function mostrarProdCarrito() {
  const db = JSON.parse(localStorage.getItem("carrito"));
  const divCarrito = document.querySelector(".divCarrito");

  if (db == null || db.length == 0) {
    divCarrito.innerHTML = `
      <img src="./assets/carritoVacio.png" alt="carrito Vacio">          
  `;
  } else {
    const divCarrito = document.querySelector(".divCarrito");
    divCarrito.innerHTML = "";
    db.forEach((prod) => {
      const producto = document.createElement("div");
      producto.classList.add("prodCarrito");
      producto.classList.add("animate__animated");
      producto.innerHTML = `
                    <p class="hidden">${prod.id}</p>
                    <img src=${prod.foto} alt=${prod.nombre}>
                    <p>${prod.nombre}</p>
                    <strong>$ ${prod.precio}</strong>  
                    <span class="restar">-</span>
                    <strong class="cantidad">1</strong>
                    <span class="sumar">+</span>
                    <button name="btnBorrarCarrito"></button>      
                    
        `;

      divCarrito.appendChild(producto);
    });
  }
}

export function calcularCantidad() {
  calcularTotal();
  const prodCarrito = document.querySelectorAll(".prodCarrito");
  prodCarrito.forEach((prod) => {
    prod.addEventListener("click", (e) => {
        if (e.target.className === "restar") {
          prod.children[5].textContent--;
          if(prod.children[5].textContent < 2 ){
            prod.children[5].textContent = 1
          }
        }
        if (e.target.className === "sumar") {
          prod.children[5].textContent++;
        } 
      calcularTotal();
    });
  });
}

export function calcularTotal() {
  let total = 0;
  const prodCarrito = document.querySelectorAll(".prodCarrito");
  prodCarrito.forEach((prod) => {
    let precios = parseFloat(prod.children[3].textContent.split(" ")[1]);
    let cantidades = parseInt(prod.children[5].textContent);
    let totalXprod = precios * cantidades;
    total += totalXprod
  });

  const divtotal = document.querySelector(".total");
  divtotal.innerHTML = `Total de su compra: $ ${total.toFixed(2)}`;
}

export function eliminarDelCarrito(e) {
  if (e.target.name == "btnBorrarCarrito") {
    let idProd = e.target.parentElement.children[0].textContent;
    let db = JSON.parse(localStorage.getItem("carrito"));
    db.forEach((prod, index) => {
      if (prod.id == idProd) {
        Swal.fire({
          title: "Esta por eliminar un producto!",
          text: "Desea elimiinar el producto del carrito",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          background: `rgba(0,0,0,.9)`,
          color: "rgba(255,255,255,.9)",
        }).then((res) => {
          if (res.isConfirmed === true) {
            e.target.parentElement.classList.add("animate__flipOutY");
            db.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(db));
            setTimeout(() => {
              mostrarProdCarrito();
              calcularTotal();
            }, 1000);
          }
        });
      }
    });
  }
}
export function comprar(){
  const btnComprar = document.querySelector(".comprar")
  btnComprar.addEventListener("click", (e) =>{
    let total = 0
    const prodsCarrito = e.target.parentElement.childNodes[5].childNodes
    prodsCarrito.forEach(e=>{
      let precio = parseFloat(e.children[3].innerText.split(" ")[1])
      let cantidad = parseInt(e.children[5].innerText)
      let porProducto = precio * cantidad
      total += porProducto
    })
    Swal.fire({
      title: "Este es el total de su compra!",
      text: `$ ${total.toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      background: `rgba(0,0,0,.9)`,
      color: "rgba(255,255,255,.9)",
    }).then((res) => {
      if (res.isConfirmed == true) {
        const carritoVacio = [];
        const divCarrito = document.querySelector(".divCarrito");
        divCarrito.classList.add("animate__flipOutY");
        localStorage.setItem("carrito", JSON.stringify(carritoVacio));
        setTimeout(() => {
          mostrarProdCarrito();
          calcularTotal();
          divCarrito.classList.remove("animate__flipOutY");
        }, 1000);
      }
      Swal.fire({
        title: "Gracias por su compra!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        background: `rgba(0,0,0,.9)`,
        color: "rgba(255,255,255,.9)",
      })
    });
    
  })
 
}
export function vaciarCarrito() {
  Swal.fire({
    title: "Esta por eliminar el carrito!",
    text: "Desea eliminar todos los productos?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    background: `rgba(0,0,0,.9)`,
    color: "rgba(255,255,255,.9)",
  }).then((res) => {
    if (res.isConfirmed == true) {
      const carritoVacio = [];
      const divCarrito = document.querySelector(".divCarrito");
      divCarrito.classList.add("animate__flipOutY");
      localStorage.setItem("carrito", JSON.stringify(carritoVacio));
      setTimeout(() => {
        mostrarProdCarrito();
        calcularTotal();
        divCarrito.classList.remove("animate__flipOutY");
      }, 1000);
    }
  });
}

export function agregarAlCarrito(e) {
  ///animar carrito
  const btnCarrito = document.querySelector("#btnCarrito");
  btnCarrito.children[0].classList.add("animate__bounce");
  setTimeout(() => {
    btnCarrito.children[0].classList.remove("animate__bounce");
  }, 1000);

  ///obtener datos

  let foto = e.target.parentElement.children[0].src;
  let nombre = e.target.parentElement.children[1].textContent;
  let precio = parseFloat(
    e.target.parentElement.children[4].textContent.split(" ")[1]
  );
  ///Crear objeto producto
  const prodCarrito = new ProductoCarrito();
  prodCarrito.id = Date.now();
  prodCarrito.nombre = nombre;
  prodCarrito.foto = foto;
  prodCarrito.precio = precio;
  return prodCarrito;
}

