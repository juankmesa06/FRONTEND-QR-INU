import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css';

const precios = {
  pequeno: 15000,
  mediano: 20000,
  grande: 25000,
};

function CompraQR() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [cantidades, setCantidades] = useState({
    pequeno: 0,
    mediano: 0,
    grande: 0,
  });

  // Nombres para grabar en cada placa
  const [nombres, setNombres] = useState({
    pequeno: [''],
    mediano: [''],
    grande: [''],
  });

  // Datos de envío
  const [datosEnvio, setDatosEnvio] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // Estado de compra
  const [comprando, setComprando] = useState(false);

  // Actualiza cantidad y nombres
  const handleCantidad = (tipo, valor) => {
    setCantidades(prev => {
      const nuevaCantidad = Math.max(0, prev[tipo] + valor);
      setNombres(nombresPrev => ({
        ...nombresPrev,
        [tipo]: Array(nuevaCantidad).fill('').map((_, i) => nombresPrev[tipo][i] || '')
      }));
      return { ...prev, [tipo]: nuevaCantidad };
    });
  };

  // Actualiza nombre grabado
  const handleNombreChange = (tipo, idx, value) => {
    setNombres(prev => ({
      ...prev,
      [tipo]: prev[tipo].map((n, i) => (i === idx ? value : n))
    }));
  };

  // Actualiza datos de envío
  const handleEnvioChange = e => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  // Calcula total
  const total =
    cantidades.pequeno * precios.pequeno +
    cantidades.mediano * precios.mediano +
    cantidades.grande * precios.grande +
    (cantidades.pequeno + cantidades.mediano + cantidades.grande > 0 ? 20000 : 0);

  // Realiza la compra
  const handleCompra = async () => {
    setComprando(true);
    const items = [
      ...nombres.pequeno.map(name => ({
        type: 'SMALL',
        price: precios.pequeno,
        nameToEngrave: name
      })),
      ...nombres.mediano.map(name => ({
        type: 'MEDIUM',
        price: precios.mediano,
        nameToEngrave: name
      })),
      ...nombres.grande.map(name => ({
        type: 'LARGE',
        price: precios.grande,
        nameToEngrave: name
      })),
    ].filter(item => item.nameToEngrave && item.nameToEngrave.trim() !== '');

    const compra = {
      items,
      ...datosEnvio
    };

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const res = await fetch(`${apiUrl}/purchase`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(compra)
      });
      const result = await res.json();
      if (res.ok && result.mercadoPagoUrl) {
        window.location.href = result.mercadoPagoUrl;
      } else {
        alert(result.message || 'No se pudo procesar la compra');
      }
    } catch  {
            alert('Error al conectar con el servidor');
    } finally {
      setComprando(false);
    }
  };

  return (
    <div className="container my-5 compraqr-page" style={{ marginTop: '90px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold text-inu display-5">🐾 Compra tu Medalla QR para Mascotas</h2>
        <p className="lead text-secondary">
          Protege a tu mascota con una medalla QR personalizada. Elige el tamaño, ponle el nombre de tu mascota y realiza el pago seguro. Envíos a toda Colombia 🇨🇴
        </p>
      </div>

      <h4 className="text-center text-inu mb-4 fw-semibold">
        📏 Elige la medalla ideal y personalízala con el nombre de tu mascota
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
            <div className="mt-2">
              {cantidades.pequeno > 0 && (
                <div>
                  <label className="form-label fw-bold">Nombre(s) para grabar:</label>
                  {nombres.pequeno.map((nombre, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Nombre mascota #${idx + 1}`}
                      value={nombre}
                      onChange={e => handleNombreChange('pequeno', idx, e.target.value)}
                      maxLength={20}
                      required
                    />
                  ))}
                </div>
              )}
              <span className="badge bg-success">Valor unitario: $15.000</span>
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
              <li>Medalla QR reforzada</li>
              <li>Medalla de <strong>aluminio</strong> o <strong>acero inoxidable</strong></li>
              <li>Personalizado con QR grabado</li>
            </ul>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('mediano', -1)}>-</button>
              <span className="fw-bold">{cantidades.mediano}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('mediano', 1)}>+</button>
            </div>
            <div className="mt-2">
              {cantidades.mediano > 0 && (
                <div>
                  <label className="form-label fw-bold">Nombre(s) para grabar:</label>
                  {nombres.mediano.map((nombre, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Nombre mascota #${idx + 1}`}
                      value={nombre}
                      onChange={e => handleNombreChange('mediano', idx, e.target.value)}
                      maxLength={20}
                      required
                    />
                  ))}
                </div>
              )}
              <span className="badge bg-warning text-dark">Valor unitario: $20.000</span>
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
              <li>Medalla resistente con QR metálico</li>
              <li>Medalla de <strong>acero inoxidable</strong></li>
              <li>Personalización avanzada</li>
            </ul>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('grande', -1)}>-</button>
              <span className="fw-bold">{cantidades.grande}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleCantidad('grande', 1)}>+</button>
            </div>
            <div className="mt-2">
              {cantidades.grande > 0 && (
                <div>
                  <label className="form-label fw-bold">Nombre(s) para grabar:</label>
                  {nombres.grande.map((nombre, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Nombre mascota #${idx + 1}`}
                      value={nombre}
                      onChange={e => handleNombreChange('grande', idx, e.target.value)}
                      maxLength={20}
                      required
                    />
                  ))}
                </div>
              )}
              <span className="badge bg-danger">Valor unitario: $25.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de compra */}
      <div className="alert alert-info text-center mt-5" role="alert">
        <strong>Resumen de tu compra:</strong><br />
        {cantidades.pequeno > 0 && (
          <div>
            {cantidades.pequeno} medalla(s) pequeño x $15.000 = <strong>${cantidades.pequeno * precios.pequeno}</strong>
            <br />Nombres: {nombres.pequeno.filter(n => n).join(', ')}
          </div>
        )}
        {cantidades.mediano > 0 && (
          <div>
            {cantidades.mediano} medalla(s) mediano x $20.000 = <strong>${cantidades.mediano * precios.mediano}</strong>
            <br />Nombres: {nombres.mediano.filter(n => n).join(', ')}
          </div>
        )}
        {cantidades.grande > 0 && (
          <div>
            {cantidades.grande} medalla(s) grande x $25.000 = <strong>${cantidades.grande * precios.grande}</strong>
            <br />Nombres: {nombres.grande.filter(n => n).join(', ')}
          </div>
        )}
        {total > 0 && (
          <>
            <div>Envío = $20.000</div>
            <hr />
            <div>
              <strong>Total a pagar: ${total}</strong>
            </div>
          </>
        )}
      </div>

      {/* Formulario de datos de envío */}
      {total > 0 && (
        <div className="alert alert-secondary mt-4">
          <h5 className="mb-3">Datos para el envío</h5>
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="fullName"
                placeholder="Nombre completo"
                value={datosEnvio.fullName}
                onChange={handleEnvioChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="phone"
                placeholder="Teléfono"
                value={datosEnvio.phone}
                onChange={handleEnvioChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="address"
                placeholder="Dirección"
                value={datosEnvio.address}
                onChange={handleEnvioChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="city"
                placeholder="Ciudad"
                value={datosEnvio.city}
                onChange={handleEnvioChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="state"
                placeholder="Departamento"
                value={datosEnvio.state}
                onChange={handleEnvioChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="postalCode"
                placeholder="Código postal"
                value={datosEnvio.postalCode}
                onChange={handleEnvioChange}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleCompra}
            disabled={comprando || !datosEnvio.fullName || !datosEnvio.phone || !datosEnvio.address || !datosEnvio.city || !datosEnvio.state || !datosEnvio.postalCode}
          >
            {comprando ? 'Procesando...' : 'Ir a pagar'}
          </button>
        </div>
      )}

      <div className="alert alert-info text-center mt-3" role="alert">
        <strong>¿Cómo funciona?</strong><br />
        1. Elige el tamaño y cantidad de medallas.<br />
        2. Escribe el nombre de cada mascota para grabar en la placa.<br />
        3. Ingresa tus datos de envío.<br />
        4. Realiza el pago seguro.<br />
        5. Recibe la medalla en tu domicilio en Medellín o cualquier ciudad de Colombia.<br />
        6. Ingresa a <a href="https://inutrips.com" target="_blank" rel="noopener noreferrer">inutrips.com</a>, crea un usuario y agrega tu mascota.<br />
        7. La medalla QR que recibiste tiene un código único. Al registrar tu mascota, ingresa ese ID.<br />
        <span className="text-danger fw-semibold">* Recuerda: cada código QR es válido solo para una mascota.</span><br />
        8. Si tu mascota se pierde, quien escanee el QR podrá contactarte fácilmente.
      </div>
    </div>
  );
}

export default CompraQR;