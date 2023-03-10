import { useNavigate } from "react-router-dom";

function CardService({ servicio }) {

  const navigate = useNavigate();

  const irServicio = (id_servicio) => {
    navigate(`/servicio/${id_servicio}`);
  };

  return (
    <div className="carta">
      <div className="card caja-img">
        <div className="cont-img-card">
        <img
          className="card-img-top"
          src={require(`../../assets/img/${servicio.img_src}`) == undefined ? require(`../../assets/img/DESAYUNO_1.jpeg`) : require(`../../assets/img/${servicio.img_src}`)}
          alt="serv"
        />
        </div>
        <div className="card-body">
          <h5 className="card-title">{servicio.titulo} </h5>
          <hr />
          <div className="cont-descripcion">
            <p>{servicio.descripcion}</p>
          </div>
          <hr />
          <div className="precio">
            <h3>
              <b>$ {Intl.NumberFormat('de-DE').format(servicio.precio)
              }</b>
            </h3>
          </div>
          <div className="botones mt-2">
            <button
              className="btn btn-info"
              onClick={() => irServicio(servicio.id_servicio)}>
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
