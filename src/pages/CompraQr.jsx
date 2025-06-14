import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function CompraQR() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">🐾 Collares QR para Mascotas</h2>
        <p className="lead">
          Protege a tu mascota con un collar QR de identificación. Escanea y conecta.
        </p>
      </div>

      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-success">Collar Básico</h5>
            <p>Hecho de nylon resistente, QR visible y seguro. Ideal para mascotas pequeñas.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-warning">Collar Estilo Premium</h5>
            <p>Material acolchado, varios colores, QR metálico grabado. Cómodo y elegante.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-danger">Collar Personalizado</h5>
            <p>Elige el diseño, color y forma. El QR va grabado con un código único para tu mascota.</p>
          </div>
        </div>
      </div>

      <div className="alert alert-info text-center" role="alert">
        🧾 <strong>¿Cómo funciona?</strong><br />
        1. Compra un collar QR en nuestra tienda o distribuidores.<br />
        2. La primera vez que se escanea el QR, se abre una página de registro.<br />
        3. El dueño debe crear una cuenta.<br />
        4. Luego, registra a su mascota ingresando el ID del QR impreso en el collar.<br />
        5. ¡Listo! Ahora cualquiera que escanee el QR podrá ver tus datos de contacto si tu mascota se pierde.
      </div>

      <div className="text-center">
        <a href="/registro" className="btn btn-outline-primary me-2">Registrarse</a>
        <a href="/formulario-mascota" className="btn btn-outline-success me-2">Ya tengo un QR</a>
        <a href="tel:+573001234567" className="btn btn-outline-danger">
          📞 Llamar a un agente
        </a>
      </div>
    </div>
  );
}

export default CompraQR;
