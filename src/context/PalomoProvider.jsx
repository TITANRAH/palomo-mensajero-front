import { useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const PalomoContext = createContext({});

function PalomoProvider({ children }) {
  const navigate = useNavigate();
  const [arrServicios, setArrServicios] = useState([]);
  const [usuarioGlobal, setUsuarioGlobal] = useState([]);
  const [servicioSel, setServicioSel] = useState({});
  const [serviciosCarrito, setServiciosCarrito] = useState([]);
  const [servicioContratado, setServicioContratado] = useState([]);
  const [misPedidos, setMisPedidos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [servicios, setServicios] = useState([]);

  const totalComprasServicios = serviciosCarrito.reduce(
    (a, s) => a + s.precio * s.count,
    0
  );
  const MySwal = withReactContent(Swal);

  const getServices = async () => {
    try {
      const options = {
        method: "GET",
        url: `https://proyecto-final-back-production-045b.up.railway.app/servicios`,
      };

      await axios.request(options).then((response) => {
        setArrServicios(response.data);
      });
    } catch (error) { }
  };

  const getContractServices = async () => {
    const token = localStorage.getItem("token");
    try {
      const options = {
        method: "GET",
        url: `https://proyecto-final-back-production-045b.up.railway.app/servicios_contratados_usuarios`,

        headers: { Authorization: "Bearer " + token },

      };

      await axios.request(options).then((response) => {
        setServicioContratado(response.data);
      });
    } catch (error) { }
  };

  /*GET ROLES*/

  async function getRoles() {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = "/roles";
    const token = localStorage.getItem("token");
    const resp = await axios.get(urlServer + endpoint, {
      headers: { Authorization: "Bearer " + token },
    });

    if (resp.status === 200) {
      setRoles(resp.data);
    } else {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>No se pudieron obtener los roles.</i>,
        icon: "warning",
      }).then(() => {
        navigate("/dashboardAdmin");
      });
    }
  }

  /*GET SERVICIOS*/

  async function getServicios() {
    const urlServer =
      "https://proyecto-final-back-production-045b.up.railway.app";
    const endpoint = "/servicios";
    const token = localStorage.getItem("token");
    const resp = await axios.get(urlServer + endpoint, {
      headers: { Authorization: "Bearer " + token },
    });

    if (resp.status === 200) {
      setServicios(resp.data);
    } else {
      MySwal.fire({
        title: <strong>Error !</strong>,
        html: <i>No se pudieron obtener los servicios.</i>,
        icon: "warning",
      }).then(() => {
        navigate("/dashboardAdmin");
      });
    }
  }

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
        icon: "warning",
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

  async function eliminarServicio(id_servicio) {

    if (!id_servicio)
      return MySwal.fire({
        title: <strong>Alerta</strong>,
        html: <i>No se encontro el servicio</i>,
        icon: "warning",

      });

    try {
      const urlServer =
        "https://proyecto-final-back-production-045b.up.railway.app";
      const endpoint = `/servicio/${id_servicio}`;
      const token = localStorage.getItem("token");
      const res = await axios.delete(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        MySwal.fire({
          title: <strong>Éxito</strong>,
          html: <i>El servicio se ha eliminado éxitosamente</i>,
          icon: "success",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar otro Servicio",
          cancelButtonText: "Ir a Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            getServicios();
            navigate("/admin_servicios");
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
      console.log(error);
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
        servicioContratado,
        misPedidos,
        setMisPedidos,
        getPedidos,
        restarPagado,
        getContractServices,
        getRoles,
        roles,
        setRoles,
        getServicios,
        servicios,
        eliminarServicio
      }}
    >
      {children}
    </PalomoContext.Provider>
  );
}

export { PalomoProvider };

export default PalomoContext;
