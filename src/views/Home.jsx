import { useEffect } from "react";
import usePalomo from "../hooks/usePalomo.jsx";
import Banner from "../components/componentes_generales/Banner.jsx";
import CardService from "../components/componentes_generales/CardService";

export default function Home() {
  const { getServices, arrServicios } = usePalomo();

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      <Banner></Banner>

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
