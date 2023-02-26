import MensajeroServiciosContratados from "./DashboardMensajeroDirectory/MensajeroServiciosContratados";
import usePalomo from "../../hooks/usePalomo";
import { useEffect } from "react";
export default function DashboardMensajero() {
  const { getContractServices, servicioContratado } = usePalomo();

  useEffect(() => {
    getContractServices();
  }, []);

  return (
    <div className="container py-5 h-100">
      <div className="dashboardMensajero text-center">
      {servicioContratado.length === 0 ? (
              <div className="carrito-vacío pt-3">
                <h4>Sin servicios por entregar</h4>
              </div>
            ) :( 
       <div>
         <h3 className="text-center my-3 pb-3">Estatus de Servicios</h3>
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Servicio</th>
                <th scope="col" className="column-direccion">Dirección</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {servicioContratado.map((servicio) => (
                <tr key={servicio.id_serv_contratados}>
                  <MensajeroServiciosContratados servicio={servicio} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}

      </div>
    </div>
  );
}
