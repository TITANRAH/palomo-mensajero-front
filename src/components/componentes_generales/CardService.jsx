import anadir from "../../assets/iconos/anadir.png";
// import pizzaBoton from "../assets/pizza.png";
import { useNavigate } from "react-router-dom";
// import usePalomo from "../../hooks/usePalomo";

function CardService({ servicio }) {
  console.log(servicio.img_src);
  //   const { add } = usePizza();

    const navigate = useNavigate();

  //   const irPizza = (nombre) => {
  //     navigate(`/pizza/${nombre}`);
  //   };

  return (
    <div className="carta">
      <div className="card">
        <img
          className="card-img-top"
          src={require("../../assets/img/DESAYUNO_1.jpeg")}
          alt="serv"
        />
        <div className="card-body">
          <h5 className="card-title">{servicio.titulo} </h5>
          <hr />

          <p>{servicio.descripcion}</p>

          <hr />

          <div className="precio">
            <h3>
              <b>$ {servicio.precio}</b>
            </h3>
          </div>

          <div className="botones mt-2">
            <button
              className="btn btn-info"
              //   onClick={() => irPizza(pizza.name)}
            >
              Ver Más <img className="imagen-boton" alt="" />
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {

                console.log('detalleServicio ')
                navigate('/login')

              }
               
              
              }
            >
              Añadir <img className="imagen-boton" src={anadir} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardService;
