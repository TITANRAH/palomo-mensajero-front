import { NavLink, useNavigate } from "react-router-dom";
import palomoLogo from "../../assets/iconos/paloma-mensajera.png";
import usePalomo from "../../hooks/usePalomo";

function Navbar() {
  const { usuarioGlobal, setUsuarioGlobal, totalComprasServicios } =
    usePalomo();
  const navigate = useNavigate();
  const logout = () => {
    setUsuarioGlobal([]);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <NavLink to="/">
        <span className="logo">
          <img className="imagen-nav" src={palomoLogo} alt="" />
          <span className="palomo">El Palomo Mensajero</span>
        </span>
      </NavLink>
      <div>
        {usuarioGlobal.length === 0 ? (
          <div>
            <NavLink to="/registro">
              <button className="btn  m-1 btn-light">Registrarse</button>
            </NavLink>

            <NavLink to="/login">
              <button className="btn btn-info">Iniciar Sesión</button>
            </NavLink>
          </div>
        ) : (
          <div className="container">
            <div className="col-auto">
              <span className="palomo">
                <strong>Bienvenido</strong>, {usuarioGlobal.nombre}{" "}
                {usuarioGlobal.apellido}{" "}
              </span>

              <button onClick={logout} className="btn btn-danger mr-3">
                Salir
              </button>
              {usuarioGlobal.id_rol === parseInt(1) ? (
                <button
                  onClick={navigate("mis_pedidos/" + usuarioGlobal.id_usuario)}
                  className="btn btn-success"
                >
                  Mis Pedidos
                </button>
              ) : (
                ""
              )}
            </div>
            {usuarioGlobal.id_rol === parseInt(1) ? (
              <>
                <div className="col-auto">
                  <NavLink to="carrito">
                    <i className="fa-solid fa-cart-plus fa-xl"></i>
                  </NavLink>

                  <span>
                    <strong>
                      {" "}
                      ${" "}
                      {Intl.NumberFormat("de-DE").format(
                        totalComprasServicios
                      )}{" "}
                    </strong>
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
