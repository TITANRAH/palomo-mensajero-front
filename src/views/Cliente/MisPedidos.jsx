import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TablaDatos from "./TablaDatos";
import usePalomo from "../../hooks/usePalomo";

export default function MisPedidos() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getPedidos, misPedidos } = usePalomo();

  useEffect(() => {
    getPedidos(id);
  }, []);


  return (
    <>
      <div className="tabla-datos">
        <TablaDatos servicioCon={misPedidos} />
        <div className="row">
          <div className="col-6">
            <button
              onClick={() => navigate(`/carrito`)}
              className="btn btn-success mt-3"
            >
              IR A CARRITO
            </button>
          </div>

          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
}
