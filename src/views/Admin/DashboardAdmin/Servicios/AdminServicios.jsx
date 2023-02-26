import { useEffect } from "react";
import usePalomo from "../../../../hooks/usePalomo";

export default function AdminServicios() {
  const { servicios, getServicios, eliminarServicio } = usePalomo();


  useEffect(() => {
    getServicios();

  }, []);

  return (
    <>
      <div className="tabla-datos-admin-servicios">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Servicio</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col"><i className="bi bi-trash eliminar"></i></th>
            </tr>
          </thead>
          {servicios.map((s, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <label className="form-control">{s.id_servicio}</label>
                </td>
                <td>
                  <label className="form-control">{s.titulo}</label>
                </td>
                <td>
                  <label className="form-control">{s.descripcion}</label>
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-danger"
                    onClick={() => eliminarServicio(s.id_servicio)}>ELIMINAR
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
