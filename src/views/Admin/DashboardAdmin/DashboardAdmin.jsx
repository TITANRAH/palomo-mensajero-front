
import { useNavigate } from "react-router-dom";
import CajaDashboardAdmin from "./admin_components/CajaDashboardAdmin";
import admin_crear_rol from "../../../assets/iconos/admin_crear_rol.png"
import admin_rol from "../../../assets/iconos/admin_rol.png"
import admin_service from "../../../assets/iconos/admin_service.png"
import admin_services from "../../../assets/iconos/admin_services.png"


export default function DashboardAdmin() {

  const navigate = useNavigate();
  const adminRol = "Administrar roles";
  const createRol = "Crear roles";
  const adminServ = "Administrar servicios";
  const createServ = "Crear servicios";

  return (
    <div className="dashboardadmin">
      <div >
        <div className="caja-admin" onClick={() => navigate("/admin_roles")}>
          <CajaDashboardAdmin titulo={adminRol} icono = {admin_crear_rol} />
        </div>
        <div className="caja-admin" onClick={() => navigate("/crear_roles_admin")}>
          <CajaDashboardAdmin titulo={createRol} icono = {admin_rol} />
        </div>
      </div>

      <div >
        <div className="caja-admin" onClick={() => navigate("/admin_servicios")}>
          <CajaDashboardAdmin titulo={adminServ} icono = {admin_service}/>
        </div>
        <div className="caja-admin" onClick={() => navigate("/crear_servicios_Admin")}>
          <CajaDashboardAdmin titulo={createServ} icono = {admin_services}/>
        </div>
      </div>
    </div>
  );
}
