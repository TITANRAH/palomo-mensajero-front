import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatearFecha } from "../../helpers/formatearFecha";
import usePalomo from "../../hooks/usePalomo";

export default function ServicioContratado() {
  const { servicioContratado, setPedido, pedido } = usePalomo();
  const { id } = useParams();
  const fecha = new Date();
  const fechaFormateada = formatearFecha(fecha);
  const [direccionEnvio, setDireccionEnvio] = useState("");

  console.log("id_servicio", fechaFormateada);
  console.log(
    "servicioContratado desde servicios contratados",
    servicioContratado
  );

  const realizarPedido = () => {


    const usuario = JSON.parse(localStorage.getItem("usuario")) 


    const pedidoContratado = {
      id_usuario: usuario.id_usuario,
      id_servicio: id,
      id_estado: 1,
      direccion_envio: direccionEnvio,
      fecha_solicitud: fechaFormateada,
      fecha_entrega: "2023/09/09",
      precio_final: "18990",
    };

    console.log("pedido", pedidoContratado);
    setDireccionEnvio("");
  };

  // useEffect(()=>{

  // }, [])

  return (
    <div className="mt-5">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h1>Direccíon de envío</h1>
        <hr />
        <div className="form-group mt-1 ">
          <label>Dirección</label>
          <input
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
            type="text"
            name="direccion"
            className="form-control"
            placeholder="Ingresa la dirección"
          />
          <label className="mt-4"><b>Medio de pago</b></label>
          <div className="row">
            <div className="col-6">
              <label>N° de tarjeta</label>
              <input
                readOnly
                type="text"
                name="tarjeta"
                className="form-control"
                placeholder="XXXX-XXXX-XXXX-4321"
              />
            </div>

            <div className="col-6">
              <label>CVC</label>
              <input
                readOnly
                type="text"
                name="tarjeta"
                className="form-control"
                placeholder="XX4"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => realizarPedido()}
          className="btn btn-success mt-3"
        >
          PAGAR
        </button>
      </div>
    </div>
  );
}
