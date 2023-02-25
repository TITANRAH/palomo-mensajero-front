import usePalomo from "../../../hooks/usePalomo";
import "../../../index.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
  const { getServices } = usePalomo();
  const navigate = useNavigate();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "no-active");

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col" onClick={() => navigate("/admin_roles")}>
       
      </div>
      <div className="col" onClick={() => navigate("/crear_roles_admin")}>
        <div className="card h-100">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Ingresa aquí para crear roles</h5>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div className="col" onClick={() => navigate("/admin_servicios")}>
        <div className="card h-100">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              Ingresa aquí para administar servicios
            </h5>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div className="col" onClick={() => navigate("/crear_servicios_Admin")}>
        <div className="card h-100">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Ingresa aquí para crear servicios</h5>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  );
}
