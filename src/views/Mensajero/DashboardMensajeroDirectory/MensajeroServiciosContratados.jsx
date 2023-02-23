function MensajeroServiciosContratados({ servicio }) {
    console.log(servicio)
  return (
    <>
    
      <th scope="row">{servicio.id_servicio}</th>

      <td>{servicio.titulo}</td>
      <td>{servicio.descripcion}</td>
      <td>
        <button type="submit" className="btn btn-success">
          EN CURSO
        </button>
      </td>
    </>
  );
}

export default MensajeroServiciosContratados;