import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePalomo from "../../hooks/usePalomo";
import { useNavigate } from "react-router-dom";
import anadir from "../../assets/iconos/anadir.png";
import DESAYUNO_1 from "../../assets/img/DESAYUNO_1.jpeg";

export default function DetalleServicio() {
  const { id } = useParams();
  const [foto, setFoto] = useState('')

  const { arrServicios, MySwal, servicioSel, setServicioSel, add } =
    usePalomo();

  const navigate = useNavigate();

  function swal() {
    MySwal.fire({
      title: <strong>No encontramos ningun servicio con ese nombre!</strong>,
      html: <i>Serás dirigido a Home !</i>,
      icon: "error",
    }).then(() => {
      navigate("/");
    });
  }

  useEffect(() => {



    async function servicio() {
      const servicioSeleccionado = await arrServicios.find((servicio) => {
    
        return servicio.id_servicio === parseInt(id);
      });

      if (
        servicioSeleccionado === undefined ||
        servicioSeleccionado === "" ||
        servicioSeleccionado === null
      ) {
        swal();
      } else {
        setServicioSel(servicioSeleccionado);
        setFoto(servicioSeleccionado.img_src);

      }
    }

    servicio();

  }, []);

  return (
    <>
      {servicioSel !== {} ? (
        <div className="contenedor-detalle-servicio">
          <div className="servicio-unique-contenedor mt-3 m-3">
            <div className="row servicio-palomo">
              <div className="form-img-detalle">
                <img
                  className="foto-servicio"
                  src={foto === '' ? DESAYUNO_1 : require(`../../assets/img/${foto}`)}
                  alt=""
                />
              </div>
              <div className="descripcion">
                <h5 className="mt-4" autoCapitalize="capitalize">
                  {servicioSel.titulo}
                </h5>
                <hr />
                <p>{servicioSel.descripcion}</p>

                <div className="cont-precio-btn">
                  <h4>
                    <b>Precio : $ {Intl.NumberFormat('de-DE').format(servicioSel.precio)}</b>
                  </h4>

                  <div className="botones mt-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => add(servicioSel)}
                    >
                      Añadir <img className="imagen-boton" src={anadir} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
