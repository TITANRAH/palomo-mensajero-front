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
          <div className="cart">
            <table cellspacing="5" cellpadding="10">
              <tr>
                <td align="right">
                  <span className="palomo">
                    <strong>Bienvenido</strong>, {usuarioGlobal.email}{" "}
                  </span>
                </td>
                <td>
                  <button onClick={logout} className="btn btn-danger">
                    Salir
                  </button>
                </td>
                <td></td>
                <td align="center">
                  {usuarioGlobal.id_rol === parseInt(1) ? (
                    <NavLink to="carrito">
                      <i class="fa-solid fa-cart-plus fa-xl"></i>
                    </NavLink>
                  ) : (
                    ""
                  )}
                </td>

                <td>
                  <span>
                    <strong>${totalComprasServicios}</strong>
                  </span>
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
