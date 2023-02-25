import { useEffect } from "react";
import usePalomo from "../../../../hooks/usePalomo";

export default function AdminServicios() {
  const { servicios, getServicios, editarServicio, eliminarServicio } = usePalomo();

  useEffect(() => {
    getServicios();
    // console.log(servicios);
  }, []);

  // function eliminarServicios(id) {
  //   console.log(id);
  // }

  // function editarServicios(id) {
  //   console.log(id);
  // }

  return (
    <>
      <div className="tabla-datos">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Servicio</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col"><i className="bi bi-pencil-square editar"></i></th>
              <th scope="col"><i className="bi bi-trash eliminar"></i></th>
            </tr>
          </thead>

          {servicios.map((s, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <input
                    id="id_servicio"
                    className="form-control"
                    placeholder={s.id_servicio}
                    type="text"
                  />
                </td>
                <td>
                  <input
                    id="titulo_servicio"
                    className="form-control"
                    placeholder={s.titulo}
                    type="text"
                  />
                </td>
                <td>
                  <input
                    id="precio_servicio"
                    className="form-control"
                    placeholder={s.precio}
                    type="text"
                  />
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-success"
                    onClick={() => editarServicio(s.id_servicio)}
                  >
                    GUARDAR
                  </button>{" "}
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-danger"
                    onClick={() => eliminarServicio(s.id_servicio)}
                  >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
