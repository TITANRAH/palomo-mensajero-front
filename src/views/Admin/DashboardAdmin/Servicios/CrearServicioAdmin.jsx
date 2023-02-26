import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePalomo from "../../../../hooks/usePalomo";

export default function CrearServicioAdmin() {
  const navigate = useNavigate();
  const [servicio, setServicio] = useState({});
  const { MySwal } = usePalomo();

  const handleSetServicio = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setServicio({ ...servicio, ...field });
  };

  async function createServiceAdmin() {
    console.log("servicio", servicio);

    if (
      !servicio.titulo ||
      !servicio.descripcion ||
      !servicio.precio ||
      !servicio.categoria ||
      !servicio.img_src
    )
      return MySwal.fire({
        title: <strong>Alerta</strong>,
        html: <i>Todos los campos son obligatorios</i>,
        icon: "warning",
      });

    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app/";
    const endpoint = "crear-servicio";
    try {
      const resp = await axios.post(urlServer + endpoint, servicio, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resp.status === 200) {
        MySwal.fire({
          title: <strong>Servicio creado con éxito</strong>,
          html: <i>¿Deseas crear otro servicio, o volver al dashboard?</i>,
          icon: "success",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Crear otro servicio",
          cancelButtonText: "Ir a dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/crear_servicios_admin");
          } else {
            navigate("/dashboardAdmin");
          }
        });
      } else {
        MySwal.fire({
          title: <strong>Alerta</strong>,
          html: <i>Ha ocurrido un error</i>,
          icon: "warning",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>Vuelve a intentarlo!</i>,
        icon: "error",
      });
    }

    setServicio("");
  }

  return (
    <div className=" tabla-crear mt-5 mb-5">
      <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
        <h1>Crear Servicio</h1>
        <hr />

        <div className="form-group mt-1 ">
          <label className="mt-3">Título</label>
          <input
            onChange={handleSetServicio}
            type="titulo"
            name="titulo"
            className="form-control"
            placeholder="Ingresa el título"
            value={servicio.titulo || ""}
          />
          <label className="mt-3">Nombre de la imagen</label>
          <input
            onChange={handleSetServicio}
            type="img_src"
            name="img_src"
            className="form-control"
            placeholder="Ingresa el nombre de la imagen"
            value={servicio.img_src || ""}
          />
          <label className="mt-3">Precio</label>
          <input
            onChange={handleSetServicio}
            type="precio"
            name="precio"
            className="form-control"
            placeholder="Ingresa un valor sin puntos"
            value={servicio.precio || ""}
          />
          <label className="mt-3">Descripción</label>
          <textarea
            onChange={handleSetServicio}
            className="form-control"
            id="descripcion"
            placeholder="Ingresa la descripcíon aquí..."
            name="descripcion"
            rows="4"
            cols="50"
            value={servicio.descripcion || ""}
          ></textarea>

          <div className="form-group  mt-3">
            <label>Asigna una categoría</label>
            <select
              value={servicio.categoria || ""}
              className="form-control"
              name="categoria"
              onChange={handleSetServicio}
            >
              {" "}
              <option value={"DEFAULT"}>SELECCIONA UNA CATEGORIA...</option>
              <option value={"DESAYUNOS"}>DESAYUNOS</option>
              <option value={"SERENATAS"}>SERENATAS</option>
              <option value={"ALMUERZOS"}>ALMUERZOS</option>
              <option value={"CHOCOLATES"}>CHOCOLATES</option>
              <option value={"SALUDO_SORPRESA"}>SALUDO_SORPRESA</option>
            </select>
          </div>
        </div>

        <button onClick={createServiceAdmin} className="btn btn-success mt-3">
          CREAR SERVICIO
        </button>
      </div>
    </div>
  );
}
