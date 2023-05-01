export class Producto {
  constructor(id, nombre, precio, dimensiones, caracteristicas, foto) {
    (this.id = id), (this.nombre = nombre), (this.precio = precio);
    this.dimensiones = dimensiones;
    this.caracteristicas = caracteristicas;
    this.foto = foto;
  }
}
