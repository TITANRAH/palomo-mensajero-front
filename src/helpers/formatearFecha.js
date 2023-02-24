export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    year: "numeric",
    day: "2-digit",
    month: "numeric",
  };

  return fechaNueva
    .toLocaleDateString("en-us", opciones)
    .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
};
