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
  const [servicioContratado, setServicioContratado] = useState([]);
  const [misPedidos, setMisPedidos] = useState([]);

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

  const getContractServices = async () => {
    const token = localStorage.getItem("token");
    console.log("Entre al servicios contratados")
    try {
      const options = {
        method: "GET",
        url: `https://proyecto-final-back-production-045b.up.railway.app/todos_servicios_contratados`,
        
          headers: { Authorization: "Bearer " + token },
        
      };

        await axios.request(options).then((response) => {
        setServicioContratado(response.data);

        console.log("respuesta de api", response);
      });
    } catch (error) {}
  };



  async function getPedidos(id_usuario) {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = `/servicio_contratado/${id_usuario}`;
    const token = localStorage.getItem("token");
    const resp = await axios.get(urlServer + endpoint, {
      headers: { Authorization: "Bearer " + token },
    });

    if (resp.status === 200) {
      setMisPedidos(resp.data);
    } else {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>No se pudieron obtener los pedidos del usuario.</i>,
        icon: "success",
      }).then(() => {
        navigate("/misPedidos");
      });
    }
  }

  function add(servicio) {
    const existe = serviciosCarrito.find(
      (s) => s.id_servicio === servicioSel.id_servicio
    );

    if (existe) {
      MySwal.fire({
        title: <strong>Alerta</strong>,
        html: (
          <i>
            El servicio de {existe.titulo} ya esta agregado a tu carrito.
            <b>SERÁS REDIRIGIDO A HOME !</b>
          </i>
        ),
        icon: "warning",
      }).then(() => {
        navigate("/");
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

  function restar(id_servicio) {
    const existe = serviciosCarrito.find((s) => s.id_servicio === id_servicio);

    if (existe) {
      MySwal.fire({
        title: (
          <strong>Eliminaste el servicio {existe.titulo} de tu carrito</strong>
        ),
        html: <i>Vuelve a solcitarlo!</i>,
        icon: "warning",
      }).then(() => {
        setServiciosCarrito(
          serviciosCarrito.filter((s) => s.id_servicio !== existe.id_servicio)
        );
      });
    }
  }

  function restarPagado(id_servicio) {
    const existe = serviciosCarrito.find((s) => s.id_servicio === id_servicio);

    setServiciosCarrito(
      serviciosCarrito.filter((s) => s.id_servicio !== existe.id_servicio)
    );
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
        servicioContratado,
        misPedidos,
        setMisPedidos,
        getPedidos,
        restarPagado,
        getContractServices
      }}
    >
      {children}
    </PalomoContext.Provider>
  );
}

export { PalomoProvider };

export default PalomoContext;
