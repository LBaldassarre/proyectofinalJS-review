const carrusel = document.querySelector(".carrusel");
const titulos = document.querySelector(".titulos");
const btnIra = document.querySelector(".btnIra");

setTimeout(() => {
  titulos.classList.add("animate__bounceInLeft");
  titulos.classList.remove("hidden");
}, 500);

setTimeout(() => {
  carrusel.classList.add("animate__bounceInDown");
  carrusel.classList.remove("hidden");
}, 1500);

setTimeout(() => {
  btnIra.classList.add("animate__bounceInUp");
  btnIra.classList.remove("hidden");
  ////Se remueven todas las clases de animacion para que funcione hover
  setTimeout(() => {
    btnIra.classList.remove("animate__animated");
    btnIra.classList.remove("animate__bounceInUp");
  }, 100);
}, 2500);

setInterval(() => {
  const ultimo = document.querySelector(".carrusel").lastElementChild;
  carrusel.prepend(ultimo);
}, 2999);
