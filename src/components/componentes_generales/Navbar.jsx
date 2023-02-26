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
                <strong>Bienvenido</strong>, {usuarioGlobal.email}{" "}
              </span>

              <button onClick={logout} className="btn btn-danger">
                Salir
              </button>
            </div>
            {usuarioGlobal.id_rol === parseInt(1) ? (
              <>
                <div className="col-auto">
                  <NavLink to="carrito">
                    <i className="fa-solid fa-cart-plus fa-xl"></i>
                  </NavLink>

                  <span>
                    <strong> ${totalComprasServicios} </strong>
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
