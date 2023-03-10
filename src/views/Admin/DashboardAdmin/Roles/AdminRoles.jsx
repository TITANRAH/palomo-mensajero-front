import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePalomo from "../../../../hooks/usePalomo";

export default function AdminRoles() {
  const { roles, getRoles, MySwal } = usePalomo();
  const [editRol, setEditRol] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getRoles();
  }, []);

  async function eliminar(id) {
    if (!id)
      return MySwal.fire({
        title: <strong>Alerta</strong>,
        html: <i>No se encontro el rol</i>,
        icon: "warning",
      });

    try {
      const urlBase = `https://proyecto-final-back-production-045b.up.railway.app/roles`;
      const res = await axios.delete(urlBase, {
        data: { id: id },
      });

      if (res.status === 200) {
        MySwal.fire({
          title: <strong>Éxito</strong>,
          html: <i>El rol se ha eliminado con éxitosamente</i>,
          icon: "success",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar otro rol",
          cancelButtonText: "Ir a dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            getRoles();
            navigate("/admin_roles");
          } else {
            navigate("/dashboardAdmin");
          }
        });
      } else {
        MySwal.fire({
          title: <strong>Alerta</strong>,
          html: <i>Ha ocurrido un error</i>,
          icon: "warning",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>Vuelve a intentarlo!</i>,
        icon: "error",
      });

      console.log(error);
    }
  }

  async function editar(id) {
    if (!id || !editRol.email_rol || !editRol.id_rol)
      return MySwal.fire({
        title: <strong>Alerta</strong>,
        html: <i>Todos los campos son obligatorios</i>,
        icon: "warning",
      });

    const rolAeditar = {
      id_roles: parseInt(id),
      id_rol: editRol.id_rol,
      email_rol: editRol.email_rol,
    };

    const urlBase =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endPoint = "/roles";

    try {
      const res = await axios.put(urlBase + endPoint, rolAeditar, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (res.status === 200) {
        MySwal.fire({
          title: <strong>Éxito</strong>,
          html: <i>El rol se ha editado con éxitosamente</i>,
          icon: "success",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Editar otro rol",
          cancelButtonText: "Ir a dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            getRoles();
            navigate("/admin_roles");
          } else {
            navigate("/dashboardAdmin");
          }
        });
      } else {
        MySwal.fire({
          title: <strong>Alerta</strong>,
          html: <i>Ha ocurrido un error</i>,
          icon: "warning",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>Vuelve a intentarlo!</i>,
        icon: "error",
      });
    }
  }

  const handleEditRol = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setEditRol({ ...editRol, ...field });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterRolesPorEmail = roles.filter((rol) => {
    if (rol.email_rol.toUpperCase().includes(search.toUpperCase())) {
      return true;
    }

    return false;
  });

  return (
    <>
      <div className="tabla-datos-admin">
        <h1>Editar Rol</h1>
        <hr />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Rol</th>
              <th scope="col">
                Buscar por email
                <input
                  className="form-control"
                  type="text"
                  value={search}
                  onChange={handleChange}
                />
              </th>
              <th scope="col">
                <i className="bi bi-pencil-square editar"></i>
              </th>
              <th scope="col">
                <i className="bi bi-trash eliminar"></i>
              </th>
            </tr>
          </thead>

          {filterRolesPorEmail.map((r, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <select
                    className="form-input"
                    name="id_rol"
                    onChange={handleEditRol}
                  >
                    {" "}
                    <option value="DEFAULT">EL ROL ACTUAL ES: {r.id_rol == 2 ? 'MENSAJERO' : r.id_rol == 3 ? 'ADMIN' : 'CLIENTE'}</option>
                    <option value={2}>ASIGNAR: MENSAJERO</option>
                    <option value={3}>ASIGNAR: ADMIN</option>
                  </select>
                </td>
                <td>
                  <input
                    id="email_rol"
                    className="form-input"
                    placeholder={r.email_rol}
                    type="text"
                    name="email_rol"
                    onChange={handleEditRol}
                  />
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-success"
                    onClick={() => {
                      editar(r.id_roles);
                    }}
                  >
                    EDITAR
                  </button>{" "}
                </td>
                <td>
                  <button
                    className="boton-editar btn btn-danger"
                    onClick={() => eliminar(r.id_roles)}
                  >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <button
          onClick={() => navigate("/dashboardAdmin")}
          className="btn btn-success mt-3"
        >
          VOLVER A DASHBOARD
        </button>
      </div>
    </>
  );
}
