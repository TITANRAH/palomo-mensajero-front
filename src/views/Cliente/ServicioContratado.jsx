import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatearFecha } from "../../helpers/formatearFecha";
import usePalomo from "../../hooks/usePalomo";

export default function ServicioContratado() {
  const { servicioContratado, setPedido, pedido, serviciosCarrito } =
    usePalomo();
  const { id } = useParams();
  const fecha = new Date();
  const fechaFormateada = formatearFecha(fecha);
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const navigate = useNavigate();

  console.log("id_servicio", fechaFormateada);
  console.log("servicioContratado desde servicios contratados", fecha);
  

  const realizarPedido = async () => {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app/";
    const endpoint = `servicio/${id}`;
    const precioServicioPedido = serviciosCarrito.find((s) => {
      return s.precio === servicioContratado.precio;
    });

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    const pedidoContratado = {
      id_usuario: usuario.id_usuario,
      id_servicio: parseInt(id),
      id_estado: 1,
      direccion_envio: direccionEnvio,
      fecha_solicitud: fechaFormateada.replace(
        /^(\d{4})-(\d{2})-(\d{2})$/g,
        "$3/$2/$1"
      ),
      fecha_entrega: "2023/09/09",
      precio_final: precioServicioPedido.precio,
    };

    try {
      const resp = await axios.post(urlServer + endpoint, pedidoContratado, {
        headers: { Authorization: "Bearer " + token },
      });
      alert("Pedido realizado correctamente");
      console.log(resp.data);
      // navigate("/login");
    } catch (error) {
      alert("Algo salió mal ...");
      console.log(error);
    }

    console.log("pedido", pedidoContratado);
    setDireccionEnvio("");
  };

  const handlerDireccion = (e) => {
    e.preventDefault();

    setDireccionEnvio(e.target.value);
  };

  return (
    <div className="mt-5">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h1>Direccíon de envío</h1>
        <hr />
        <div className="form-group mt-1 ">
          <label>Dirección</label>
          <input
            value={direccionEnvio}
            onChange={(e) => handlerDireccion(e)}
            type="text"
            name="direccion"
            className="form-control"
            placeholder="Ingresa la dirección"
          />
          <label className="mt-4">
            <b>Medio de pago</b>
          </label>
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

        <button
          onClick={() => navigate('/mis-pedidos')}
          className="btn btn-success mt-3"
        >
          IR A MIS PEDIDOS
        </button>
      </div>
    </div>
  );
}
