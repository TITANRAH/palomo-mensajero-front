import { useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const PalomoContext = createContext({});

function PalomoProvider({ children }) {
  const navigate = useNavigate();
  const [arrServicios, setArrServicios] = useState([]);
  const [usuarioGlobal, setUsuarioGlobal] = useState({});
  const [servicioSel, setServicioSel] = useState({});
  const [serviciosCarrito, setServiciosCarrito] = useState([]);
  const [servicioContratado, setServicioContratado] = useState({});
  const totalComprasServicios = serviciosCarrito.reduce(
    (a, s) => a + s.precio * s.count,
    0
  );
  const MySwal = withReactContent(Swal);

  console.log(
    "servicios añadidos serviciosCarrito desde context",
    serviciosCarrito
  );

  console.log("usuario global desde context", usuarioGlobal);

  const getServices = async () => {
    try {
      const options = {
        method: "GET",
        url: `https://proyecto-final-back-production-045b.up.railway.app/servicios`,
      };

      await axios.request(options).then((response) => {
        setArrServicios(response.data);

        console.log("respuesta de api", response);
      });
    } catch (error) {}
  };

  // const getUsuarioData = async () => {
  //   const urlServer = "https://desafio6nodesoft-production.up.railway.app";
  //   const endpoint = "/usuarios";
  //   const token = localStorage.getItem("token");
  //   console.log('token desde front',token)

  //   try {
  //     const {data} = await axios.get(urlServer + endpoint, {
  //       headers: { Authorization: "Bearer " + token },
  //     });

  //     console.log('data desde front', data)
  //     await setUsuario(data);
  //   //   await setUsuariol(data[0]);

  //     console.log('data:',usuario)
  //   } catch ({ response: { data: message } }) {
  //     alert(message + " 🙁");
  //     console.log(message);
  //   }
  // };

  function add(servicio) {
    let irCarrito;
    const existe = serviciosCarrito.find(
      (s) => s.id_servicio === servicioSel.id_servicio
    );

    if (existe) {
      MySwal.fire({
        title: (
          <strong>
            Llevas {existe.count + 1} servicios de {existe.titulo} en tu carrito
          </strong>
        ),
        html: (
          <i>
            Estos servicios estan en estado "en curso", gracias por tu
            preferencia.
          </i>
        ),
        icon: "success",
      }).then(() => {
        setServiciosCarrito(
          serviciosCarrito.map((s) =>
            s.id_servicio === servicio.id_servicio
              ? { ...existe, count: existe.count + 1 }
              : s
          )
        );
      });
    } else {
      MySwal.fire({
        title: (
          <strong>
            Haz añadido el servicio de {servicio.titulo} a tu carrito
          </strong>
        ),
        html: (
          <i>
            Este servicio esta en un estado "en curso", gracias por tu
            preferencia!, <b>AHORA TE LLEVAREMOS A TU CARRITO</b>
          </i>
        ),
        icon: "success",
      }).then(() => {
        setServiciosCarrito([...serviciosCarrito, { ...servicio, count: 1 }]);
        navigate("/carrito");
      });
    }
  }

  function restar(servicio) {
    const existe = serviciosCarrito.find(
      (s) => s.id_servicio === servicio.id_servicio
    );

    if (existe.count === 1) {
      MySwal.fire({
        title: (
          <strong>
            Eliminaste el servicio {servicio.titulo} de tu carrito
          </strong>
        ),
        html: <i>Vuelve a solcitarlo!</i>,
        icon: "warning",
      }).then(() => {
        setServiciosCarrito(
          serviciosCarrito.filter((s) => s.id_servicio !== s.id_servicio)
        );
      });
    } else {
      setServiciosCarrito(
        serviciosCarrito.map((s) =>
          s.id_servicio === servicio.id_servicio
            ? { ...existe, count: existe.count - 1 }
            : s
        )
      );

      console.log("serviciosCarrito desde context", serviciosCarrito);
    }
  }

  return (
    <PalomoContext.Provider
      value={{
        setArrServicios,
        getServices,
        arrServicios,
        setUsuarioGlobal,
        MySwal,
        usuarioGlobal,
        servicioSel,
        setServicioSel,
        serviciosCarrito,
        add,
        restar,
        setServiciosCarrito,
        totalComprasServicios,
        setServicioContratado,
        servicioContratado
      }}
    >
      {children}
    </PalomoContext.Provider>
  );
}

export { PalomoProvider };

export default PalomoContext;
