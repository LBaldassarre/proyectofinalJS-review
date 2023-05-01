import { Producto } from "./clases/Producto.js";
import { Logica } from "./clases/Logica.js";

//Formulario/
const formulario = document.getElementById("formulario");
const inputFoto = document.getElementById("foto");
//Formulario
const previewImg = document.getElementById("preview");


const producto = new Producto();
const logica = new Logica();
logica.mostrarProd()
logica.borrarProd()


//Previsualizar foto
inputFoto.addEventListener("change", (e) => {
  let foto = inputFoto.files[0];
  if (foto) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      previewImg.setAttribute("src", e.target.result);
      producto.foto = e.target.result;     
    };
    fileReader.readAsDataURL(foto);    
  }
  
});


//Guardar producto
formulario.addEventListener("submit", (e) => {
  const inputNombre = document.getElementById("nombre").value;
  const inputPrecio = document.getElementById("precio").value;
  const inputDimensiones = document.getElementById("dimensiones").value;
  const inputCaracteristicas = document.getElementById("caracteristicas").value;
//crear objeto producto
  producto.id = Date.now();
  producto.nombre = inputNombre;
  producto.precio = inputPrecio;
  producto.dimensiones = inputDimensiones;
  producto.caracteristicas = inputCaracteristicas;

  const logica = new Logica();
  logica.crearProd(producto);
  logica.mostrarProd()

  e.preventDefault();
  Swal.fire({
    title: 'Producto agregado!',
    text: 'Su producto fue agregado con exito!',
    icon: 'success',
    confirmButtonText: 'Ok'
  })
});




