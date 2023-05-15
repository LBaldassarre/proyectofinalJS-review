export class Logica{
crearProd(producto){
    if(localStorage.getItem("Productos") === null){
        let productos = [];
        productos.push(producto)
        localStorage.setItem("Productos", JSON.stringify(productos))
    }else{
      let db = JSON.parse(localStorage.getItem("Productos"))
      db.push(producto)
      localStorage.setItem("Productos", JSON.stringify(db))
    }
    this.resetForm()
}

resetForm(){
    const previewImg = document.getElementById("preview");
    formulario.reset()
    previewImg.setAttribute("src", "");
    
    
}

mostrarProd(){
    let db = JSON.parse(localStorage.getItem("Productos"))
    const stock = document.getElementById("stock"); 
    if(db == null || db.length == 0){
        stock.innerHTML = ""
        const cardProducto = document.createElement("div")
        cardProducto.classList.add("cardProducto")
        cardProducto.innerHTML =`
                <strong>Agrega Productos a la lista</strong>            
    `
    stock.append(cardProducto)
    }else{
        stock.innerHTML = ""
        db.forEach(prod => {    
            const cardProducto = document.createElement("div")
            cardProducto.classList.add("cardProducto")
            cardProducto.innerHTML =`
                    <button class="btnBorrar"><img name="borrar" src="./assets/icons/trash.svg" alt=""></button>
                    <p class="hidden">${prod.id}</p>
                    <img src=${prod.foto || "./assets/productos/producto-sin-imagen.png"} alt="">
                    <p>${prod.nombre}</p>
                    <small>${prod.dimensiones}</small>
                    <small>${prod.caracteristicas}</small>
                    <strong>$ ${prod.precio}</strong>        
                    
        `
        stock.append(cardProducto)
        });
    }
    
}
borrarProd(){
    const stock = document.getElementById("stock"); 
    stock.addEventListener("click", e=>{
      if(e.target.name == "borrar"){
        let idCard = e.target.parentElement.parentElement.childNodes[3].textContent
        let db = JSON.parse(localStorage.getItem("Productos"))
        db.forEach((prod, index) => {
          if (prod.id == idCard) {
            Swal.fire({
              title: 'Esta por eliminar un producto!',
              text: 'Desea elimiinar el producto',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then(res=>{
              if(res.isConfirmed === true){
                db.splice(index, 1)
                localStorage.setItem("Productos", JSON.stringify(db))
                const logica = new Logica();
                logica.mostrarProd()
              }
            })      
          }    
        });     
    }
    })   
}
}