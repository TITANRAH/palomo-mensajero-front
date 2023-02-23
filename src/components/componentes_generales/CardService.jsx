
// import pizzaBoton from "../assets/pizza.png";
import { useNavigate } from "react-router-dom";
// import usePalomo from "../../hooks/usePalomo";

function CardService({ servicio }) {
  console.log(servicio.img_src);
  //   const { add } = usePizza();
  
  const navigate = useNavigate();

  const irServicio = (id_servicio) => {
    console.log(id_servicio);
    navigate(`/servicio/${id_servicio}`);
  };

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
              onClick={() => irServicio(servicio.id_servicio)}
            >
              Ver Más{" "}
              <img
                className="imagen-boton"
                src={require("../../assets/iconos/ver.png")}
                alt="ojo"
              />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CardService;
