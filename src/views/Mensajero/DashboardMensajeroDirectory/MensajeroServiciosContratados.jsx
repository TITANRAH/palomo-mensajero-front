import { useState } from "react";
import usePalomo from "../../../hooks/usePalomo";
import axios from "axios";
function MensajeroServiciosContratados({ servicio }) {
  const { getContractServices } = usePalomo();
  const [active, setActive] = useState(false);

  let claseEncurso = "";

  if (servicio.id_estado === 1) {
    // textEstado = "CONTRATADO";
    claseEncurso = "btn btn-warning";
  } else {
    // textEstado = "EN CURSO";
    claseEncurso = "btn btn-success";
  }

  const cambiarEstado = async (idServContratado, idEstado) => {
    const urlServer = `https://proyecto-final-back-production-045b.up.railway.app/servicio_contratado`;
    const token = localStorage.getItem("token");

    if (idEstado === 1) idEstado = 2;
    else idEstado = 1;

    const estadoPedido = {
      id_estado: idEstado,
      id_serv_contratados: idServContratado,
    };

    try {
      await axios.put(urlServer, estadoPedido, {
        headers: { Authorization: "Bearer " + token },
      });

      getContractServices();
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <>
      <th scope="row">
        {servicio.nombre} {servicio.apellido}
      </th>
      <td>{servicio.titulo}</td>
      <td>{servicio.direccion_envio}</td>
      <td>
        <button
          className={`${claseEncurso} ${active ? "active" : ""}`}
          onClick={() => {
            cambiarEstado(servicio.id_serv_contratados, servicio.id_estado);
            setActive(!active);
          }}
        >
          {servicio.estado}
        </button>
      </td>
    </>
  );
}

export default MensajeroServiciosContratados;
