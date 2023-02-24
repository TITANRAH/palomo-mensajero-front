import { useEffect } from "react";
import usePalomo from "../../hooks/usePalomo";

export default function TablaDatos({ servicioCon }) {
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Dirección de envío</th>
            <th scope="col">Fecha de entrega</th>
            <th scope="col">Fecha de solicitud</th>
            <th scope="col">Precio final</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>

        {servicioCon.map((s, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{s.direccion_envio}</td>
              <td>{s.fecha_entrega.replace('T00:00:00.000Z', '')}</td>
              <td>{s.fecha_solicitud}</td>
              <td>{s.precio_final}</td>
              <td>{s.id_estado == 1 ? 'CONTRATADO' : 'EN CURSO'}</td>

            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
