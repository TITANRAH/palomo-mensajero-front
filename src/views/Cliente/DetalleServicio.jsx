import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePalomo from "../../hooks/usePalomo";
import { useNavigate } from "react-router-dom";
import anadir from "../../assets/iconos/anadir.png";
import DESAYUNO_1 from "../../assets/img/DESAYUNO_1.jpeg";

export default function DetalleServicio() {
  const { id } = useParams();
  // var foto = ''
  const [foto, setFoto] = useState('')

  console.log("id_servicio", id);
  const { arrServicios, MySwal, servicioSel, setServicioSel, add } =
    usePalomo();

  console.log("arrServicios", arrServicios);
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

  

   async function  servicio() {
      const servicioSeleccionado = await arrServicios.find((servicio) => {
        return servicio.id_servicio == id;
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

    // foto = `../../assets/img/${servicioSel.img_src}` ;
  }, []);

  return (
    <>
      {servicioSel !== {} ? (
        <div className="contenedor">
          <div className="servicio-unique-contenedor mt-3 m-3">
            <div className="row servicio-palomo">
              <div className="col-5">
                <img
                  className="foto-servicio"
                  src={foto == '' ? DESAYUNO_1 : require(`../../assets/img/${foto}`)}
                  alt=""
                />
              </div>
              <div className="col-7 descripcion">
                <h5 className="mt-4" autoCapitalize="capitalize">
                  {servicioSel.titulo}
                </h5>
                <hr />
                <p>{servicioSel.descripcion}</p>

                <h4>
                  <b>Precio : $ {servicioSel.precio}</b>
                </h4>

                <div className="precio-servicio-unico mt-3 mb-4">
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
      ) : (
        <div></div>
      )}
    </>
  );
}
