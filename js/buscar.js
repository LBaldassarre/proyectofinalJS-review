export function buscarProd(e) {
   const cardProducto = document.querySelectorAll(".cardProducto");
   let inputValue = e.target.value.toLowerCase();
   cardProducto.forEach((e) => {
      if (e.textContent.toLowerCase().includes(inputValue)) {
         e.style.display = "flex";
      } else {
         e.style.display = "none";
      }
   });
}