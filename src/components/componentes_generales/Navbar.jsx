import { NavLink,useNavigate } from "react-router-dom";

import { FaCartPlus} from "react-icons/fa";

import palomoLogo from "../../assets/iconos/paloma-mensajera.png";
import usePalomo from "../../hooks/usePalomo";


function Navbar() {

  const { usuarioGlobal,setUsuarioGlobal} = usePalomo();
  const navigate = useNavigate();
  const logout = () => {
    setUsuarioGlobal([]);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario")
    navigate("/");
  };
  
  //const setActiveClass = ({ isActive }) => (isActive ? "active" : "no-active");
  return (
<>
    <nav className="navbar">
    <NavLink to="/">
    <span className="logo"><img className="imagen-nav" src={palomoLogo} alt="" /><span className="palomo">El Palomo Mensajero</span></span>
    </NavLink>
    <div className="opciones">
      {usuarioGlobal.length===0? (
        <div>
          <NavLink to="/registro">
            <button className="btn  m-1 btn-light">Registrarse</button>
          </NavLink>

          <NavLink to="/login">
            <button className="btn btn-info">Iniciar Sesión</button>
          </NavLink>
        </div>
      ) : (
        <div className="logo">
        <span className="palomo">Bienvenido, {usuarioGlobal.email} </span>
          <NavLink to="/perfil">
            <button className="btn  m-1 btn-light">Mi Perfil</button>
          </NavLink>
          <button onClick={logout} className="btn btn-danger">
            Salir
          </button>
        </div>
      )}
    </div>
  </nav>

    {/* <div className="nav">
      <div className="titulo">
        <NavLink className={setActiveClass} to="/">
          <img className="imagen-nav" src={palomoLogo} alt="" />
        </NavLink>
        <h3>El Palomo Mensajero !</h3>
      </div>
      <div className='form-cont-login'>
        <NavLink className={setActiveClass} to="login">
          <h4 className='form-tit-navbar'> Inicio de Sesión</h4>
        </NavLink>
      </div>
      <div className="carrito">
        <div className="cont-titulo-car">
          <h4>${totalComprasServicios}</h4>
        </div>
        <div className="cont-img-car">
          <NavLink className={setActiveClass} to="carrito">
          <FaCartPlus className='form-img-icons' />
          </NavLink>
        </div>
      </div>
    </div>    */}
    </>
  );
}

export default Navbar;
