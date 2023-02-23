import MensajeroServiciosContratados from "./DashboardMensajeroDirectory/MensajeroServiciosContratados";
import usePalomo from "../../hooks/usePalomo"
import { useEffect } from "react";
export default function DashboardMensajero() {
  const { getServices, arrServicios } = usePalomo();

  useEffect(() => {
    getServices();
  }, []);

    return (
      <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="card rounded-3 ml-6" style={{ width: '30rem' }} >
      
       <h1 className="text-center my-3 pb-3">Estatus de Servicios</h1>
       <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Status</th>
                       </tr>
                    </thead>
                    <tbody>
                      
                 
       {arrServicios.map((servicio) => (
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