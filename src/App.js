import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Navbar from "./components/componentes_generales/Navbar";
import Footer from "./components/componentes_generales/Footer/Footer";
import Carrito from "./views/Cliente/Carrito";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import AdminRoles from "./views/Admin/DashboardAdmin/Roles/AdminRoles";

import AdminServicios from "./views/Admin/DashboardAdmin/Servicios/AdminServicios";
import CrearServicioAdmin from "./views/Admin/DashboardAdmin/Servicios/CrearServicioAdmin";
import CrearRoles from "./views/Admin/DashboardAdmin/Roles/CrearRolesAdmin";


import DetalleServicio from "./views/Cliente/DetalleServicio";
import usePalomo from "./hooks/usePalomo";
import { useEffect } from "react";
import DashboardMensajero from "./views/Mensajero/DashboardMensajero";
import Protected from "./utils/Protected";
import ServicioContratado from "./views/Cliente/ServicioContratado";
import MisPedidos from "./views/Cliente/MisPedidos";


function App() {
  const { usuarioGlobal, setUsuarioGlobal } = usePalomo();
  

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario")) || null;
    if (usuario != null) setUsuarioGlobal(usuario);
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
              requirements={Object.keys(usuarioGlobal).length === 0}
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
            <Protected requirements={usuarioGlobal.id_rol === 3}>
              <DashboardAdmin />
            </Protected>
          }
        />

        <Route
          path="/admin_roles"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 3}>
              <AdminRoles />
            </Protected>
          }
        />

        <Route
          path="/crear_roles_admin"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 3}>
              <CrearRoles />
            </Protected>
          }
        />

        <Route
          path="/admin_servicios"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 3}>
              <AdminServicios />
            </Protected>
          }
        />

        <Route
          path="/crear_servicios_admin"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 3}>
              <CrearServicioAdmin />
            </Protected>
          }
        />
        <Route
          path="/dashboardMensajero"
          element={
            <Protected requirements={usuarioGlobal.id_rol === 2}>
              <DashboardMensajero />
            </Protected>
          }
        />
      </Routes>
      <Footer />

      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
