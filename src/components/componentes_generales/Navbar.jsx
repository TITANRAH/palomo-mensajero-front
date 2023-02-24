import { NavLink } from "react-router-dom";

import { FaCartPlus} from "react-icons/fa";

import palomoLogo from "../../assets/iconos/paloma-mensajera.png";
import usePalomo from "../../hooks/usePalomo";


function Navbar() {

  const { totalComprasServicios } = usePalomo();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "no-active");
  return (
    <div className="nav">
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
    </div>   
  );
}

export default Navbar;
