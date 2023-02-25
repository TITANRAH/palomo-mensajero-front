import { useState } from "react";
import usePalomo from "../../../hooks/usePalomo";
import axios from "axios";
function MensajeroServiciosContratados({ servicio }) {
  const { getContractServices } = usePalomo();
  const [active, setActive] = useState(false);

  let textEstado = "";
   let claseEncurso = "";
  
  if (servicio.id_estado === 1) {
    textEstado = "CONTRATADO";
    claseEncurso = "btn btn-warning"
    
  } else {
    textEstado = "EN CURSO";
    claseEncurso = "btn btn-success"
  }

  const cambiarEstado = async (idServContratado, idEstado) => {
    console.log("Entre a cambio de estado", idServContratado, idEstado);

    const urlServer = `https://proyecto-final-back-production-045b.up.railway.app/servicio_contratado`;
    const token = localStorage.getItem("token");

    if (idEstado === 1) {
      idEstado = 2;
      textEstado = "EN CURSO";
    } else {
      idEstado = 1;
      textEstado = "CONTRATADO";
    }

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
      <th scope="row">{servicio.id_usuario}</th>

      <td>{servicio.id_servicio}</td>
      <td>{servicio.direccion_envio}</td>
      <td>
        <button
          className={`${claseEncurso} ${active ? "active" : ""}`}
          onClick={() => {
            cambiarEstado(servicio.id_serv_contratados, servicio.id_estado);
            setActive(!active);
          }}
        >
          {textEstado}
        </button>
      </td>
    </>
  );
}

export default MensajeroServiciosContratados;
