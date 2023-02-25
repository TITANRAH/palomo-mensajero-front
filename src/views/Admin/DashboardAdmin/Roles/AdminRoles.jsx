import { useEffect } from "react";
import usePalomo from "../../../../hooks/usePalomo";

export default function AdminRoles() {
  const { roles, getRoles } = usePalomo();

  useEffect(() => {
    getRoles();
    console.log(roles);
  }, []);

  function eliminar(id) {
    console.log(id);
  }

  function editar(id) {
    console.log(id);
  }

  return (
    <>
      <div className="tabla-datos">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Rol</th>
              <th scope="col">Email</th>
              <th scope="col"><i class="bi bi-pencil-square editar"></i></th>
              <th scope="col"><i class="bi bi-trash eliminar"></i></th>
            </tr>
          </thead>

          {roles.map((r, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <input
                    id="id_rol"
                    className="form-control"
                    placeholder={r.id_rol}
                    type="text"
                  />
                </td>
                <td>
                  <input
                    id="email_rol"
                    className="form-control"
                    placeholder={r.email_rol}
                    type="text"
                  />
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-success"
                    onClick={() => editar(r.id_rol)}
                  >
                    GUARDAR
                  </button>{" "}
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-danger"
                    onClick={() => eliminar(r.id_rol)}
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
