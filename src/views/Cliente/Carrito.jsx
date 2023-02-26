import { useNavigate } from "react-router-dom";
import usePalomo from "../../hooks/usePalomo";

export default function Carrito() {
  const {
    serviciosCarrito,
    // add,
    setServiciosCarrito,
    restar,
    totalComprasServicios,
    setServicioContratado,
  } = usePalomo();

  const navigate = useNavigate();
  function irAhome() {
    navigate(`/`);
  }

  console.log("serviciosCarrito desde carrito", serviciosCarrito);

  const obtenerCategoria = (id_categoria) => {
    console.log("id_categoria", id_categoria);

    const categoria = serviciosCarrito.find((s) => {
      return s.id_categoria === id_categoria;
    });

    console.log("categoria", categoria.id_categoria);

    switch (categoria.id_categoria) {
      case 1:
        return "DESAYUNOS";
      case 2:
        return "SERENATAS";
      case 3:
        return "ALMUERZOS";
      case 4:
        return "CHOCOLATES";
      case 5:
        return "SALUDO_SORPRESA";
      default:
        return;
    }
  };

  const contratarServicio = (servicio) => {
    setServicioContratado(servicio);

    console.log("id servicio", servicio.id_servicio);

    navigate(`/servicio_contratado/${servicio.id_servicio}`);
  };

  return (
    <>
      <div className="detalle-contenedor mt-5 p-4">
        <div className="detalle">
          <ul>
            {serviciosCarrito.length === 0 ? (
              <div className="carrito-vacío pt-3">
                <h4>El carrito esta vacío</h4>
                <a onClick={() => irAhome()} href="/">
                  IR A HOME
                </a>
              </div>
            ) : (
              serviciosCarrito.map((s, index) => (
                <li className="pb-0 pt-5" key={index}>
                  <div className="detalle-compra">
                    <div className="detalle-imagen-nombre">
                      <img
                        className="imagen-detalle"
                        src={require(`../../assets/img/${s.img_src}`)}
                        alt="fotos"
                      />
                      <h3 className="ml-3">Servicio: {s.titulo}</h3>
                      <h3 className="categoria">
                        Categoria: {obtenerCategoria(s.id_categoria)}
                      </h3>
                    </div>

                    <div className="detalle-botones">
                      {/* <button
                        onClick={() => add(s)}
                        className="btn btn-success"
                      >
                        +
                      </button> */}

                      <h3>
                        {" "}
                        Llevas {s.count} servicio de {s.titulo} que cuesta ${" "}
                        {s.precio}
                      </h3>

                      <button
                        onClick={() => restar(s.id_servicio)}
                        className="btn btn-danger ml-5"
                      >
                        QUITAR
                      </button>

                      <button
                        onClick={() => contratarServicio(s)}
                        className="btn btn-warning"
                      >
                        PAGAR
                      </button>
                    </div>
                  </div>
                  <hr className="mt-3" />
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="eliminar-lista-total-pagar m-5">
          {serviciosCarrito.length > 0 ? (
            <div className="total-pagar mt-3">
              <h2>Total: ${totalComprasServicios}</h2>
              <button className="btn btn-success" onClick={() => irAhome()}>
                IR A HOME
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {serviciosCarrito.length >= 1 ? (
            <div className="eliminar-compras mt-5 ">
              <button
                onClick={() => setServiciosCarrito([])}
                className="btn btn-danger"
              >
                ELIMINAR COMPRAS
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
