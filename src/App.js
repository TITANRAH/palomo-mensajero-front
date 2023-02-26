import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Navbar from "./components/componentes_generales/Navbar";
import Footer from "./components/componentes_generales/Footer/Footer";
import Carrito from "./views/Cliente/Carrito";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import AdminRoles from "./views/Admin/DashboardAdmin/Roles/AdminRoles"
import CrearRoles from "./views/Admin/DashboardAdmin/Roles/CrearRolesAdmin"
import AdminServicios from "./views/Admin/DashboardAdmin/Servicios/AdminServicios"
import CrearServicioAdmin from "./views/Admin/DashboardAdmin/Servicios/CrearServicioAdmin"
import DetalleServicio from "./views/Cliente/DetalleServicio";
import usePalomo from "./hooks/usePalomo";
import { useEffect } from "react";
import DashboardMensajero from "./views/Mensajero/DashboardMensajero";
import Protected from "./utils/Protected";
import ServicioContratado from "./views/Cliente/ServicioContratado";
import MisPedidos from "./views/Cliente/MisPedidos";

function App() {
  const { usuarioGlobal, setUsuarioGlobal } = usePalomo();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('usuarioGlobal',usuarioGlobal.id_rol)

    const usuario = JSON.parse(localStorage.getItem("usuario")) || null;
    if (usuario != null) setUsuarioGlobal(usuario);

    // console.log("desde app.js", usuario);
  }, []);

  //

  return (
    <>
      {/* <BrowserRouter> */}
      <Navbar />

   
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ruta detalle servicio */}

        <Route
          path="/carrito"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 1}>
              <Carrito />
            </Protected>
          }
        />
        <Route
          path="/servicio/:id"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 1}>
              <DetalleServicio />
            </Protected>
          }
        />

        <Route
          path="/servicio_contratado/:id"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 1}>
              <ServicioContratado />
            </Protected>
          }
        />

        <Route
          path="/mis_pedidos/:id"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 1}>
              <MisPedidos />
            </Protected>
          }
        />

        <Route
          path="/login"
          element={
            <Protected
              requirements={Object.keys(usuarioGlobal).length == 0}
              redirectTo="/"
            >
              <Login />
            </Protected>
          }
        />

        <Route path="/registro" element={<Registro />} />

        <Route
          path="/dashboardAdmin"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 3}>
              <DashboardAdmin />
            // </Protected>
          }
        />

        <Route
          path="/admin_roles"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 3}>
              <AdminRoles />
            // </Protected>
          }
        />

        <Route
          path="/crear_roles_admin"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 3}>
              <CrearRoles />
            // </Protected>
          }
        />

        <Route
          path="/admin_servicios"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 3}>
              <AdminServicios />
            // </Protected>
          }
        />

        <Route
          path="/crear_servicios_admin"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 3}>
              <CrearServicioAdmin />
            // </Protected>
          }
        />
        <Route
          path="/dashboardMensajero"
          element={
            // <Protected requirements={usuarioGlobal.id_rol === 2}>
              <DashboardMensajero />
            // </Protected>
          }
        />

        {/* <Route
            path="/dashboardMensajeroRoute"
            element={
              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 2 ? (
                <Navigate to='/dashboardMensajero' />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboardAdminRoute"
            element={
              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 3 ? (
                <Navigate to='/dashboardAdmin' />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
        {/* <Route
            path="/dashboardAdmin"
            element={
              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 3 ? (
                <Navigate to={<DashboardAdmin />} />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
        {/* {console.log('usuarioGLOBAL ENTRE ROUTES', usuarioGlobal)} */}
        {/* <Route
            path="/detalleServicio"
            element={

              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 1 ? (
                <Navigate to={<DetalleServicio />} />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
      </Routes>
      <Footer />

      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
