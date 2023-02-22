import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";



import Registro from "./views/Registro";
import Navbar from "./components/componentes_generales/Navbar";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import DetalleServicio from "./views/Cliente/DetalleServicio";
import usePalomo from "./hooks/usePalomo";
import { useEffect } from "react";
import DashboardMensajero from "./views/Mensajero/DashboardMensajero";

function App() {
 

  const { usuarioGlobal } = usePalomo();

  useEffect(() => {

    console.log('usuarioGlobal',usuarioGlobal.id_rol)

    
    // let usuario = JSON.parse(localStorage.getItem("usuario"));

    // console.log("desde app.js", usuario);
  }, []);



  //

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />


          <Route
            path="/dashboardMensajero"
            element={
               usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 2  ? (
                <Navigate to={<DashboardMensajero />} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/dashboardAdmin"
            element={
              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 3 ? (
                <Navigate to={<DashboardAdmin />} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          { console.log('usuarioGLOBAL ENTRE ROUTES',usuarioGlobal)}
              <Route
            path="/detalleServicio"
            element={
            
              usuarioGlobal !== undefined && 'id_rol' in usuarioGlobal && usuarioGlobal.id_rol === 1 ? (
                <Navigate to={<DetalleServicio />} />
              ) : (
             <Navigate to="/login" />
              )
            }
          />
        </Routes>


    
      </BrowserRouter>
    </>
  );
}

export default App;
