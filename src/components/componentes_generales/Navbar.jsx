import { NavLink } from "react-router-dom";
import palomoLogo from "../../assets/iconos/paloma-mensajera.png";
import carrito from "../../assets/iconos/carrito.png";
import usePalomo from "../../hooks/usePalomo";


function Navbar() {

  const {totalComprasServicios} = usePalomo();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "no-active");
  return (
    <div className="nav">
      {/* <NavLink end to="/" className={setActiveClass}> */}
      <div className="titulo">
        <img className="imagen-nav" src={palomoLogo} alt="" />
        <h2>El Palomo Mensajero !</h2>
      </div>
      {/* </NavLink> */}

      {/* <NavLink end to="/carrito" className={setActiveClass}> */}

      <NavLink end to="/carrito" className={setActiveClass}>
        <div className="carrito">
          <img className="imagen-nav" src={carrito} alt="" />
          <h5>${totalComprasServicios}</h5>
        </div>
      </NavLink>
    </div>
  );
}

export default Navbar;
