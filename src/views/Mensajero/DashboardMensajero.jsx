import MensajeroServiciosContratados from "./DashboardMensajeroDirectory/MensajeroServiciosContratados";
import usePalomo from "../../hooks/usePalomo"
import { useEffect } from "react";
export default function DashboardMensajero() {
  const { getContractServices, servicioContratado } = usePalomo();

  useEffect(() => {
    getContractServices();
  }, []);

    return (
      <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="dashboardMensajero">
      
       <h3 className="text-center my-3 pb-3">Estatus de Servicios</h3>
       <table className="table mb-4 text-center table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Estado</th>
                       </tr>
                    </thead>
                    <tbody>
                      
                 
       {servicioContratado.map((servicio) => (
          <tr key={servicio.id_servicio}>
            <MensajeroServiciosContratados servicio={servicio} />
          </tr>
        ))}
        </tbody>
                  </table>
      </div>
      </div>
      </div>
      
    );
  }