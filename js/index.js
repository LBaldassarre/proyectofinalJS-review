const productos = document.getElementById("divProductos");
const btnLogin = document.getElementById("login");
const BD = JSON.parse(localStorage.getItem("Productos"));
const inputBuscar = document.getElementById("buscar");


inputBuscar.addEventListener("input", (e)=>{
  const cardProducto = document.querySelectorAll(".cardProducto");
   let inputValue = e.target.value.toLowerCase()
   cardProducto.forEach(e => {
   if(e.textContent.toLowerCase().includes(inputValue)){
      e.style.display= "flex"
   }else{
      e.style.display= "none"
   }
      
   })
   
   
})
 

///Pintar DB en pantalla
if(BD){
BD.forEach((e) => {
  let cardProducto = document.createElement("div");
  cardProducto.classList.add("cardProducto");
  cardProducto.innerHTML = `
                <img src="${
                  e.foto || "./assets/productos/producto-sin-imagen.png"
                }" alt="">
                <p>${e.nombre}</p>
                <small>${e.caracteristicas}</small>
                <small>${e.dimensiones} cm</small>
                <strong>$ ${e.precio}</strong>        
                <button class="btnAgregar">Agregar al Carrito</button>
`;
  productos.appendChild(cardProducto);
});
} 

btnLogin.addEventListener("click",(e)=>{
  Swal.fire({
    title: 'Ingresa tus credenciales',
    text: "Email",
    input: 'email',
    icon: 'question',
    showCancelButton: "true",
    confirmButtonText: 'Aceptar',  
    cancelButtonText: "Cancelar"   
  }).then(res=> {
    if(res.value == "coder@gmail.com"){
    Swal.fire({
      title: 'Ingresa tus credenciales',
      text: "Password",
      input: 'password',
      icon: 'question',
      showCancelButton: "true",
      confirmButtonText: 'Aceptar',  
      cancelButtonText: "Cancelar"   
    }).then(res=>{
      if(res.value == "admin"){
        window.location.href = "./pages/agregarProducto.html"
      }else{
        Swal.fire({
          title: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Aceptar',  
        })
      }
    })
  }else{
    Swal.fire({
      title: 'Credenciales incorrectas',
      icon: 'error',
      confirmButtonText: 'Aceptar',  
    })
  }
  })
})

const cerrarCarrito = document.getElementById("cerrarCarrito");
const abrirCarrito = document.getElementById("btnCarrito");
 const carrito = document.querySelector(".carrito");


cerrarCarrito.addEventListener("click", ()=>{
  carrito.classList.add("animate__backOutRight")
  window.removeEventListener('scroll', disableScroll)
  setTimeout(()=>{
    carrito.classList.add("hidden")
  }, 500)
})

function disableScroll() {
   window.scrollTo(0, 0);
}

abrirCarrito.addEventListener("click", ()=>{
  carrito.classList.remove("hidden")
  carrito.classList.remove("animate__backOutRight")
  window.addEventListener('scroll', disableScroll);
})
  


  



