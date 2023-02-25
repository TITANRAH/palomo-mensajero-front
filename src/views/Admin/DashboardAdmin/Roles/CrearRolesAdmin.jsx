import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePalomo from "../../../../hooks/usePalomo";

export default function CrearRoles() {
  const navigate = useNavigate();
  const [rol, setRol] = useState({});
  const { MySwal } = usePalomo();

  const handleSetRol = ({ target: { value, name } }) => {
   
    const field = {};
    field[name] = value;
    setRol({ ...rol, ...field });
  };

  async function createRol() {
    if (!rol.email_rol || !rol.id_rol)
      return MySwal.fire({
        title: <strong>Alerta</strong>,
        html: <i>Todos los campos son obligatorios</i>,
        icon: "warning",
      });

    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = "/roles";
    try {
      const resp = await axios.post(urlServer + endpoint, rol, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.status === 200) {
        MySwal.fire({
          title: <strong>Rol ingresado con éxito</strong>,
          html: <i>¿Deseas crear otro rol, o volver al dashboard?</i>,
          icon: "success",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Crear otro rol",
          cancelButtonText: "Ir a dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/crear_roles_admin");
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

    setRol("");
  }

  return (
    <div className="servicio-contratado mt-5">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h1>Crear Rol</h1>
        <hr />

        <div className="form-group mt-1 ">
          <label>Email</label>
          <input
            value={rol.email_rol || ""}
            onChange={handleSetRol}
            type="email"
            name="email_rol"
            className="form-control"
            placeholder="Ingresa el email"
          />

          <div className="form-group  mt-3">
            <label>Asigna un rol</label>
            <select
              value={rol.id_rol || ""}
              className="form-control"
              name="id_rol"
              onChange={handleSetRol}
            >
              {" "}
              <option value={"DEFAULT"}>Selecciona un rol...</option>
              <option value={2}>MENSAJERO</option>
              <option value={3}>ADMIN</option>
            </select>
          </div>
        </div>

        <button onClick={createRol} className="btn btn-success mt-3">
          ASIGNAR ROL
        </button>
        
      </div>
    </div>
  );
}
