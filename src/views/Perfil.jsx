import { useEffect } from "react";
import usePalomo from "../hooks/usePalomo.jsx";

import CardService from "../components/componentes_generales/CardService";

export default function Perfil() {
  const { getServices, arrServicios, usuarioGlobal } = usePalomo();
  
  useEffect(() => {

    getServices();
  }, []);

  return (
    <div>
    
      <div className="contenedor-service m-5">
        {arrServicios.map((servicio) => (
          <div key={servicio.id_servicio}>
            <CardService servicio={servicio} />
          </div>
        ))}
      </div>
    </div>
  );
}