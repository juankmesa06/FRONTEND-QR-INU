import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css';

// Simulación de links de pago (puedes reemplazar por links reales de MercadoPago, PayU, Stripe, etc.)
const linksPago = {
  pequeno: "https://www.mercadopago.com/checkout/pequeno",
  mediano: "https://www.mercadopago.com/checkout/mediano",
  grande: "https://www.mercadopago.com/checkout/grande"
};

function CompraQR() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="text-primary">🐾 Compra tu Collar QR para Mascotas</h2>
        <p className="lead">
          Protege a tu mascota con un collar QR de identificación. Elige el tamaño y realiza el pago seguro.
        </p>
      </div>

      <h4 className="text-center text-secondary mb-4">📏 Elige el collar ideal según el tamaño de tu mascota</h4>

      <div className="row g-4">
        {/* Pequeñas */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-success">🐶 Tamaño Pequeño</h5>
            <p className="mb-2">Ideal para chihuahuas, poodles toy y gatos.</p>
            <ul className="text-start">
              <li>Collar Básico QR (nylon resistente)</li>
              <li>Estilo Premium pequeño</li>
              <li>Personalizado con código único</li>
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.pequeno} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Comprar $35.000
              </a>
            </div>
          </div>
        </div>

        {/* Medianas */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-warning">🐕 Tamaño Mediano</h5>
            <p className="mb-2">Perfecto para beagles, cockers y similares.</p>
            <ul className="text-start">
              <li>Collar Básico QR reforzado</li>
              <li>Estilo Premium (acolchado, colores)</li>
              <li>Personalizado con QR grabado</li>
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.mediano} target="_blank" rel="noopener noreferrer" className="btn btn-warning text-white">
                Comprar $38.000
              </a>
            </div>
          </div>
        </div>

        {/* Grandes */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border border-warning-subtle">
            <h5 className="text-danger">🐕‍🦺 Tamaño Grande</h5>
            <p className="mb-2">Para golden retriever, labradores o pastores.</p>
            <ul className="text-start">
              <li>Collar resistente con QR metálico</li>
              <li>Estilo Premium XL</li>
              <li>Personalización avanzada</li>
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.grande} target="_blank" rel="noopener noreferrer" className="btn btn-danger">
                Comprar $42.000
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info text-center mt-5" role="alert">
        🧾 <strong>¿Cómo funciona?</strong><br />
        1. Elige y compra tu collar QR.<br />
        2. Recibe el collar en tu domicilio.<br />
        3. Escanea el QR y registra a tu mascota.<br />
        4. Si tu mascota se pierde, quien escanee el QR podrá contactarte.
      </div>
    </div>
  );
}

export default CompraQR;