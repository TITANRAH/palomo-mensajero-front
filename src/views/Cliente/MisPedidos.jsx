import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TablaDatos from "./TablaDatos";
import usePalomo from "../../hooks/usePalomo";

export default function MisPedidos() {
  const { id } = useParams();

  const { getPedidos, misPedidos } = usePalomo();

  useEffect(() => {
    getPedidos(id);
  }, []);

  console.log("misPedidos desde Mis pedidos", misPedidos);

  return (
    <>
    <div className="tabla-datos">
    <TablaDatos servicioCon={misPedidos}/>
    </div>
     
    </>
  );
}
