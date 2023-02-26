import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePalomo from "../hooks/usePalomo.jsx";
 
import axios from "axios";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [usuario, setUsuarioLocal] = useState({});
  const { setUsuarioGlobal, MySwal } = usePalomo();

  const iniciarSesion = async () => {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app/";
    const endpoint = "login";
    const usuario = {
      email,
      password,
    };
    try {
      if (!email || !password)
        return MySwal.fire({
          title: <strong>Alerta</strong>,
          html: <i>Email y password obligatorios</i>,
          icon: "warning",
        }).then(() => {});

      const {
        data: { token },
      } = await axios.post(urlServer + endpoint, usuario);

      MySwal.fire({
        title: <strong>Login realizado con éxito</strong>,
        // html: <i>Que las disfrutes!</i>,
        icon: "success",
      }).then(() => {
        localStorage.setItem("token", token);

        setTimeout(() => {
          getUsuarioData();
        }, 1);
      });
    } catch (e) {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <h2>No ha sido posible iniciar sesion vuelve a intentarlo</h2>,
        icon: "error",
      }).then(() => {
        console.log("error");
      });
    }
  };

  const getUsuarioData = async () => {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = "/usuario";
    const token = localStorage.getItem("token");
    console.log("token desde front", token);

    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });

      console.log("Usuario dede front ", data[0]);

      await setUsuarioLocal(data[0]);
      await setUsuarioGlobal(data[0]);

      

      localStorage.setItem("usuario",JSON.stringify(data[0]));

      console.log("Usuario id_rol ", data[0].id_rol);

      if (data[0].id_rol === 3) {
        navigate("/dashboardAdmin");
        console.log("es admin");
      } else if (data[0].id_rol === 2) {
        navigate("/dashboardMensajero");
        console.log("es mensajero");
      } else {
        navigate("/");
        console.log("es cliente");
      }
      console.log("data:", usuario);
    } catch (e) {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <h2>No ha sido posible obtener el usuario, vuelve a intentarlo</h2>,
        icon: "error",
      }).then(() => {
        console.log("error");
      });
    }
  };

  return (
    <div className="mt-5 caja-login">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h2>Iniciar Sesión</h2>
        <hr />
        <div className="form-group mt-1 ">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="form-control"
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="form-group mt-1 ">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="form-control"
            placeholder="Ingresa tu password"
          />
        </div>

        <button onClick={iniciarSesion} className="btn btn-primary mt-3">
          Iniciar Sesión
        </button>
        <div className="mt-5">
          <h5>
            ¿ No tienes una cuenta ?{" "}
            <a href="/registro">
              <strong> REGÍSTRATE</strong>
            </a>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
}
