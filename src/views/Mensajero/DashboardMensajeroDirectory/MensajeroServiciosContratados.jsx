import { useState } from "react";
//import usePalomo from "../../../hooks/usePalomo"

function MensajeroServiciosContratados({ servicio }) {
 // const { setServicioContratado } = usePalomo();
  const [active, setActive] = useState(false);
  let estado = "";
  let clase = "";

  //const urlActualizarStatus = "https://proyecto-final-back-production-045b.up.railway.app/servicio_contratado"

  
  if(servicio.id_servicio===1)
  {
    estado = "CONTRATADO"
    clase = "btn btn-success"
    
  }
  else{
    estado= "EN CURSO"
    clase = "btn btn-warning"
    
  }
  
  return (
    <>
      <th scope="row">{servicio.id_usuario}</th>

      <td>{servicio.id_servicio}</td>
      <td>{servicio.direccion_envio}</td>
      <td>
        <button
          className={`btn btn-success ${active ? "active" : clase}`}
          onClick={() => setActive(!active)}
        >
          {estado}
        </button>
      </td>
    </>
  );
}

export default MensajeroServiciosContratados;
