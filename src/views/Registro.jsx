import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePalomo from "../hooks/usePalomo.jsx";

export default function Registro() {
  const navigate = useNavigate();
  const { MySwal } = usePalomo();
  const [registroUsuario, setRegistroUsuario] = useState({});

  const handleSetRegistroUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setRegistroUsuario({ ...registroUsuario, ...field });
  };

  const regUser = async () => {

    if (!registroUsuario.email || !registroUsuario.password || !registroUsuario.nombre || !registroUsuario.apellido)
    return MySwal.fire({
      title: <strong>Alerta</strong>,
      html: <i>Todos los campos son obligatorios</i>,
      icon: "warning",
    }).then(() => {});

    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = "/registro";
    try {
      await axios.post(urlServer + endpoint, registroUsuario);
      MySwal.fire({
        title: <strong>Regístro realizado con éxito</strong>,
        html: <i>Regresarás al login para que inicies sesión</i>,
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
        MySwal.fire({
            title: <strong>Error !</strong>,
            html: <i>Vuelve a intentarlo!</i>,
            icon: "error",
          }).then(() => {
            navigate("/login");
          });
    }
  };

  return (
    <div className="mt-5">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h1>Regístrate</h1>
        <hr />
        <div className="form-group mt-1 ">
          <label>Nombre</label>
          <input
            value={registroUsuario.nombre || ''}
            onChange={handleSetRegistroUsuario}
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div className="form-group mt-1 ">
          <label>Apellido</label>
          <input
            value={registroUsuario.apellido || ''}
            onChange={handleSetRegistroUsuario}
            type="text"
            name="apellido"
            className="form-control"
            placeholder="Ingresa tu apellido"
          />
        </div>
        <div className="form-group mt-1 ">
          <label>Email</label>
          <input
            value={registroUsuario.email || ''}
            onChange={handleSetRegistroUsuario}
            type="email"
            name="email"
            className="form-control"
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="form-group mt-1 ">
          <label>Password</label>
          <input
            value={registroUsuario.password || ''}
            onChange={handleSetRegistroUsuario}
            type="password"
            name="password"
            className="form-control"
            placeholder="Ingresa tu password"
          />
        </div>

        <button onClick={regUser} className="btn btn-primary mt-3">
          Registrar
        </button>

        <div className="mt-5">
          <h5>
            ¿ Volver a Login ?{" "}
            <a href="/login">
              <strong> VOLVER</strong>
            </a>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
}
