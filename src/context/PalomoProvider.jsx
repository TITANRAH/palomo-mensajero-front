import { useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const PalomoContext = createContext({});


function PalomoProvider({ children }) {
  const [arrServicios, setArrServicios] = useState([]);
  const [usuarioGlobal, setUsuarioGlobal] = useState({});
 

  const MySwal = withReactContent(Swal);

  

console.log('usuario global desde context', usuarioGlobal)
  

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

  //   function add(pizza) {
  //     const existe = pizzasCarrito.find((p) => p.id === pizza.id);

  //     if (existe) {
  //       MySwal.fire({
  //         title: <strong>Llevas {existe.count + 1} pizzas {pizza.name} en tu carrito</strong>,
  //         html: <i>Que las disfrutes!</i>,
  //         icon: "success",
  //       }).then(() => {
  //         setPizzasCarrito(
  //           pizzasCarrito.map((p) =>
  //             p.id === pizza.id ? { ...existe, count: existe.count + 1 } : p
  //           )
  //         );
  //       });
  //     } else {
  //       MySwal.fire({
  //         title: <strong>Haz añadido una pizza {pizza.name} a tu carrito</strong>,
  //         html: <i>Que la disfrutes!</i>,
  //         icon: "success",
  //       }).then(() => {
  //         setPizzasCarrito([...pizzasCarrito, { ...pizza, count: 1 }]);
  //       });
  //     }
  //   }

  //   function eliminar(pizza) {

  //     const existe = pizzasCarrito.find((p) => p.id === pizza.id);

  //     if (existe.count === 1) {

  //       MySwal.fire({
  //         title: <strong>Eliminaste la pizza {pizza.name} de tu carrito</strong>,
  //         html: <i>Vuelve a pedirla!</i>,
  //         icon: "success",
  //       }).then(() => {
  //         setPizzasCarrito(pizzasCarrito.filter((p) => p.id !== pizza.id));
  //       });

  //     } else {
  //       setPizzasCarrito(
  //         pizzasCarrito.map((p) =>
  //           p.id === pizza.id ? { ...existe, count: existe.count - 1 } : p
  //         )
  //       );
  //     }
  //   }

  return (
    <PalomoContext.Provider
      value={{
        setArrServicios,
        getServices,
        arrServicios,
        setUsuarioGlobal,
        MySwal,
        usuarioGlobal
        
        
      }}
    >
      {children}
    </PalomoContext.Provider>
  );
}

export { PalomoProvider };

export default PalomoContext;
