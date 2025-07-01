import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css'; // Asegúrate de tener tu CSS ahí si aplicas estilos extra

function CompraQR() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="text-primary">🐾 Collares QR para Mascotas</h2>
        <p className="lead">
          Protege a tu mascota con un collar QR de identificación. Escanea y conecta.
        </p>
      </div>

      <h4 className="text-center text-secondary mb-4">📏 Elige el collar ideal según el tamaño de tu mascota</h4>

      <div className="row g-4">
        {/* Pequeñas */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-success">🐶 Tamaño Pequeño</h5>
            <p className="mb-2">Ideal para razas como chihuahuas, poodles toy y gatos.</p>
            <ul className="text-start">
              <li>Collar Básico QR (nylon resistente)</li>
              <li>Estilo Premium pequeño</li>
              <li>Personalizado con código único</li>
            </ul>
          </div>
        </div>

        {/* Medianas */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-warning">🐕 Tamaño Mediano</h5>
            <p className="mb-2">Perfecto para razas como beagles, cockers y similares.</p>
            <ul className="text-start">
              <li>Collar Básico QR reforzado</li>
              <li>Estilo Premium (acolchado, colores)</li>
              <li>Personalizado con QR grabado</li>
            </ul>
          </div>
        </div>

        {/* Grandes */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-danger">🐕‍🦺 Tamaño Grande</h5>
            <p className="mb-2">Para razas como golden retriever, labradores o pastores.</p>
            <ul className="text-start">
              <li>Collar resistente con QR metálico</li>
              <li>Estilo Premium XL</li>
              <li>Personalización avanzada</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert alert-info text-center mt-5" role="alert">
        🧾 <strong>¿Cómo funciona?</strong><br />
        1. Compra un collar QR en nuestra tienda o distribuidores.<br />
        2. La primera vez que se escanea el QR, se abre una página de registro.<br />
        3. El dueño debe crear una cuenta.<br />
        4. Luego, registra a su mascota ingresando el ID del QR impreso en el collar.<br />
        5. ¡Listo! Si tu mascota se pierde, quien escanee el QR podrá contactarte.
      </div>

      <div className="text-center mt-4">
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
