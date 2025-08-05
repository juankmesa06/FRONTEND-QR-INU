import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css';

const precios = {
  pequeno: 35000,
  mediano: 38000,
  grande: 42000,
};

const linksPago = {
  pequeno: "https://www.mercadopago.com/checkout/pequeno",
  mediano: "https://www.mercadopago.com/checkout/mediano",
  grande: "https://www.mercadopago.com/checkout/grande"
};

function CompraQR() {
  const [cantidades, setCantidades] = useState({
    pequeno: 0,
    mediano: 0,
    grande: 0,
  });

  const handleCantidad = (tipo, valor) => {
    setCantidades(prev => ({
      ...prev,
      [tipo]: Math.max(0, prev[tipo] + valor)
    }));
  };

  const total = Object.keys(cantidades).reduce(
    (acc, tipo) => acc + cantidades[tipo] * precios[tipo], 0
  );

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
            </ul>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('pequeno', -1)}>-</button>
              <span className="fw-bold">{cantidades.pequeno}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('pequeno', 1)}>+</button>
            </div>
            <div className="text-center mt-2">
              <span className="badge bg-success">Valor unitario: $35.000</span>
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
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('mediano', -1)}>-</button>
              <span className="fw-bold">{cantidades.mediano}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('mediano', 1)}>+</button>
            </div>
            <div className="text-center mt-2">
              <span className="badge bg-warning text-dark">Valor unitario: $38.000</span>
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
            </ul>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('grande', -1)}>-</button>
              <span className="fw-bold">{cantidades.grande}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('grande', 1)}>+</button>
            </div>
            <div className="text-center mt-2">
              <span className="badge bg-danger">Valor unitario: $42.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de compra */}
      <div className="alert alert-info text-center mt-5" role="alert">
        <strong>Resumen de tu compra:</strong><br />
        {cantidades.pequeno > 0 && (
          <div>
            {cantidades.pequeno} collar(es) pequeño x $35.000 = <strong>${cantidades.pequeno * precios.pequeno}</strong>
          </div>
        )}
        {cantidades.mediano > 0 && (
          <div>
            {cantidades.mediano} collar(es) mediano x $38.000 = <strong>${cantidades.mediano * precios.mediano}</strong>
          </div>
        )}
        {cantidades.grande > 0 && (
          <div>
            {cantidades.grande} collar(es) grande x $42.000 = <strong>${cantidades.grande * precios.grande}</strong>
          </div>
        )}
        <hr />
        <div>
          <strong>Total a pagar: ${total}</strong>
        </div>
        {/* Botón para redirigir al endpoint de pago */}
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.href = "https://www.tu-endpoint-de-pago.com"}
          disabled={total === 0}
        >
          Ir a pagar
        </button>
      </div>

      <div className="alert alert-info text-center mt-3" role="alert">
  <strong>¿Cómo funciona?</strong><br />
  1. Elige el tamaño y cantidad de collares.<br />
  2. Realiza el pago seguro.<br />
  3. Recibe el collar en tu domicilio en Medellín o cualquier ciudad de Colombia.<br />
  4. Ingresa a <a href="https://inutrips.com" target="_blank" rel="noopener noreferrer">inutrips.com</a>, crea un usuario con todos tus datos y agrega tu mascota.<br />
  5. El collar QR que recibiste tiene un código único. Al momento de registrar tu mascota, ingresa ese ID.<br />
  <span className="text-danger fw-semibold">* Recuerda: cada código QR es válido solo para una mascota.</span><br />
  6. Ponle el collar de tu mascota con la placa identificativa INUQR.<br />
  7. Si tu mascota se pierde, quien escanee el QR podrá contactarte fácilmente.
</div>
    </div>
  );
}

export default CompraQR;