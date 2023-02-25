export default function ({ titulo, icono }) {
  return (
    <>
      <div className="card h-100">
        <div className="imagen-dashAdmin">
          <img src={icono} className="card-img-top" alt="..." />
        </div>

        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
        </div>
      </div>
    </>
  );
}
