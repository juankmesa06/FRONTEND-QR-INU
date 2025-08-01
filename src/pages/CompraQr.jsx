import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css';

const linksPago = {
  pequeno: "https://www.mercadopago.com/checkout/pequeno",
  mediano: "https://www.mercadopago.com/checkout/mediano",
  grande: "https://www.mercadopago.com/checkout/grande"
};

function CompraQR() {
  return (
    <div className="container my-5 compraqr-page" style={{ marginTop: '90px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold text-inu display-5">🐾 Compra tu Collar QR para Mascotas</h2>
        <p className="lead text-secondary">
          Protege a tu mascota con un collar QR de identificación. Elige el tamaño ideal y realiza el pago seguro. Envíos a toda Colombia 🇨🇴
        </p>
      </div>

      <h4 className="text-center text-inu mb-4 fw-semibold">
        📏 Elige el collar ideal según el tamaño de tu mascota
      </h4>

      <div className="row g-4">
        {/* Pequeño */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/collar-pequeno.png" alt="Collar pequeño" style={{width: 80}} />
            </div>
            <h5 className="text-success fw-bold">🐶 Tamaño Pequeño</h5>
            <p className="mb-2">Ideal para chihuahuas, poodles toy y gatos.</p>
            <ul className="text-start small">
              <li>Collar QR en nylon resistente</li>
              <li>Medalla de <strong>acrílico</strong> o <strong>aluminio</strong></li>
              <li>Personalizado con código único</li>
              <li></li>
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.pequeno} target="_blank" rel="noopener noreferrer" className="btn btn-inu w-100">
                Comprar $35.000
              </a>
            </div>
          </div>
        </div>

        {/* Mediano */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/collar-mediano.png" alt="Collar mediano" style={{width: 80}} />
            </div>
            <h5 className="text-warning fw-bold">🐕 Tamaño Mediano</h5>
            <p className="mb-2">Perfecto para beagles, cockers y similares.</p>
            <ul className="text-start small">
              <li>Collar QR reforzado</li>
              <li>Medalla de <strong>aluminio</strong> o <strong>acero inoxidable</strong></li>
              <li>Personalizado con QR grabado</li>
              
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.mediano} target="_blank" rel="noopener noreferrer" className="btn btn-inu w-100">
                Comprar $38.000
              </a>
            </div>
          </div>
        </div>

        {/* Grande */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/collar-grande.png" alt="Collar grande" style={{width: 80}} />
            </div>
            <h5 className="text-danger fw-bold">🐕‍🦺 Tamaño Grande</h5>
            <p className="mb-2">Para golden retriever, labradores o pastores.</p>
            <ul className="text-start small">
              <li>Collar resistente con QR metálico</li>
              <li>Medalla de <strong>acero inoxidable</strong></li>
              <li>Personalización avanzada</li>
              <li></li>
            </ul>
            <div className="text-center mt-3">
              <a href={linksPago.grande} target="_blank" rel="noopener noreferrer" className="btn btn-inu w-100">
                Comprar $42.000
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info text-center mt-5" role="alert">
        <strong>¿Cómo funciona?</strong><br />
        1. Elige el tamaño del collar.<br />
        2. Realiza el pago seguro.<br />
        3. Recibe el collar en tu domicilio en Medellín o cualquier ciudad de Colombia.<br />
        4. Escanea el QR y registra a tu mascota.<br />
        5. Si tu mascota se pierde, quien escanee el QR podrá contactarte fácilmente.
      </div>
    </div>
  );
}

export default CompraQR;