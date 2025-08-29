import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CompraQR.css';

const precios = {
  pequeno: 5000,
  mediano: 10000,
  grande: 15000,
};

function CompraQR() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [cantidades, setCantidades] = useState({
    pequeno: 0,
    mediano: 0,
    grande: 0,
  });

  const [nombres, setNombres] = useState({
    pequeno: [''],
    mediano: [''],
    grande: [''],
  });

  const [datosEnvio, setDatosEnvio] = useState({
    fullName: '',
    phone: '',
    address: '',
    document: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const departamentosColombia = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Andes", "Medellín", "Bello", "Envigado", "Itagüí", "Rionegro", "Apartadó", "Turbo", "Caucasia", "Sabaneta", "La Ceja", "Copacabana", "Girardota", "Marinilla", "La Estrella", "Jardín"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga", "Galapa"],
    "Bogotá D.C.": ["Bogotá"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá"],
    "Caldas": ["Manizales", "Villamaría", "Chinchiná", "La Dorada"],
    "Caquetá": ["Florencia"],
    "Cauca": ["Popayán", "Santander de Quilichao"],
    "Cesar": ["Valledupar", "Aguachica"],
    "Chocó": ["Quibdó"],
    "Córdoba": ["Montería", "Lorica"],
    "Cundinamarca": ["Soacha", "Facatativá", "Zipaquirá", "Girardot", "Chía", "Fusagasugá", "Mosquera"],
    "Guaviare": ["San José del Guaviare"],
    "Huila": ["Neiva", "Pitalito"],
    "La Guajira": ["Riohacha", "Maicao"],
    "Magdalena": ["Santa Marta", "Ciénaga"],
    "Meta": ["Villavicencio", "Acacías"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales"],
    "Norte de Santander": ["Cúcuta", "Ocaña"],
    "Putumayo": ["Mocoa"],
    "Quindío": ["Armenia", "Calarcá"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
    "Sucre": ["Sincelejo"],
    "Tolima": ["Ibagué", "Espinal"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Buga", "Cartago"],
    "Vaupés": ["Mitú"],
    "Vichada": ["Puerto Carreño"],
  };

  const [comprando, setComprando] = useState(false);

  // ALERTA si no está logueado
  const isLogged = !!localStorage.getItem('user');

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

  const handleNombreChange = (tipo, idx, value) => {
    setNombres(prev => ({
      ...prev,
      [tipo]: prev[tipo].map((n, i) => (i === idx ? value : n))
    }));
  };

  const handleEnvioChange = e => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setDatosEnvio({ ...datosEnvio, phone: value.replace(/\D/g, '').slice(0, 10) });
    } else if (name === 'document') {
      setDatosEnvio({ ...datosEnvio, document: value.slice(0, 10) });
    } else {
      setDatosEnvio({ ...datosEnvio, [name]: value });
    }
  };

  const total =
    cantidades.pequeno * precios.pequeno +
    cantidades.mediano * precios.mediano +
    cantidades.grande * precios.grande +
    (cantidades.pequeno + cantidades.mediano + cantidades.grande > 0 ? 20000 : 0);

  const handleCompra = async () => {
    // Bloquea si no está logueado
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    if (!token) {
      alert('Debes iniciar sesión para comprar medallas.');
      setComprando(false);
      return;
    }
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
    if (items.length === 0) {
      alert('Debes seleccionar al menos una medalla y proporcionar un nombre para grabar.');
      setComprando(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/purchase`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(compra)
      });
      const result = await res.json();
      if (res.ok && result.initPoint) {
        window.location.href = result.initPoint;
      } else {
        alert(result.message || 'No se pudo procesar la compra');
      }
    } catch {
      alert('Error al conectar con el servidor');
    } finally {
      setComprando(false);
    }
  };

  return (
    <div className="">
      {!isLogged && (
        <div className="alert alert-warning text-center fw-bold">
          Debes iniciar sesión para comprar medallas y continuar con el proceso de compra.
        </div>
      )}

      <div className="text-center mb-5">
        <div className="mx-auto" style={{
          maxWidth: 1500,
          background: "#fffbe7",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px 0 rgba(249, 175, 21, 0.10)",
          padding: "2.2rem 1.2rem 1.5rem 1.2rem",
          border: "2.5px solid #f9af15"
        }}>
          <h2 className="fw-bold text-inu display-5 mb-3" style={{ letterSpacing: 1 }}>
            🐾 Compra tu <span style={{ color: "#f9af15" }}>Medalla QR</span> para Mascotas
          </h2>
          <p className="lead text-secondary mb-3" style={{ fontWeight: 600 }}>
            Protege a tu mascota con una medalla QR <span className="fw-bold" style={{ color: "#f9af15" }}>personalizada</span>.<br />
            Elige el tamaño, ponle el nombre de tu mascota y realiza el pago seguro.<br />
            <span className="badge bg-warning text-dark mt-2">Envíos a toda Colombia</span>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
            <i className="bi bi-shield-check text-warning fs-4"></i>
            <span className="fw-semibold text-inu" style={{ fontSize: "1.1rem" }}>
              Seguridad, identidad y tranquilidad para tu peludo
            </span>
          </div>
        </div>
      </div>

      <h4 className="text-center text-inu mb-4 fw-semibold" style={{ fontSize: "1.25rem" }}>
        📏 Elige la medalla ideal y personalízala con el nombre de tu mascota
      </h4>

      <div className="row g-4">
        {/* Pequeño */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/medallas.png" alt="Collar pequeño" style={{width: 250, height: 250}} />
            </div>
            <h5 className="text-success fw-bold">🐶 Tamaño Pequeño</h5>
            <p className="mb-2">Ideal para chihuahuas, poodles toy y gatos.</p>
            <ul className="text-start small">
              <li>Medalla QR en nylon resistente</li>
              <li>Medalla de <strong>acrílico</strong></li>
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
              <span className="badge bg-success">Valor unitario: $5.000</span>
            </div>
          </div>
        </div>

        {/* Mediano */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/medallas.png" alt="Collar mediano" style={{width: 250, height: 250}} />
            </div>
            <h5 className="text-warning fw-bold">🐕 Tamaño Mediano</h5>
            <p className="mb-2">Perfecto para beagles, cockers y similares.</p>
            <ul className="text-start small">
              <li>Medalla QR en nylon resistente</li>
              <li>Medalla de <strong>acrílico</strong></li>
              <li>Personalizado con código único</li>
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
              <span className="badge bg-warning text-dark">Valor unitario: $10.000</span>
            </div>
          </div>
        </div>

        {/* Grande */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm h-100 border-0 card-collar">
            <div className="text-center mb-2">
              <img src="/images/medallas.png" alt="Collar grande" style={{width: 250, height: 250}} />
            </div>
            <h5 className="text-danger fw-bold">🐕‍🦺 Tamaño Grande</h5>
            <p className="mb-2">Para golden retriever, labradores o pastores.</p>
            <ul className="text-start small">
              <li>Medalla QR en nylon resistente</li>
              <li>Medalla de <strong>acrílico</strong></li>
              <li>Personalizado con código único</li>
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
              <span className="badge bg-danger">Valor unitario: $15.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de compra */}
      <div className="alert alert-info text-center mt-5" role="alert">
        <strong>Resumen de tu compra:</strong><br />
        {cantidades.pequeno > 0 && (
          <div>
            {cantidades.pequeno} medalla(s) pequeño x $5.000 = <strong>${cantidades.pequeno * precios.pequeno}</strong>
            <br />Nombres: {nombres.pequeno.filter(n => n).join(', ')}
          </div>
        )}
        {cantidades.mediano > 0 && (
          <div>
            {cantidades.mediano} medalla(s) mediano x $10.000 = <strong>${cantidades.mediano * precios.mediano}</strong>
            <br />Nombres: {nombres.mediano.filter(n => n).join(', ')}
          </div>
        )}
        {cantidades.grande > 0 && (
          <div>
            {cantidades.grande} medalla(s) grande x $15.000 = <strong>${cantidades.grande * precios.grande}</strong>
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
            {/* Nombre completo */}
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
            {/* Teléfono */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="phone"
                placeholder="Teléfono"
                value={datosEnvio.phone}
                onChange={handleEnvioChange}
                maxLength={10}
                required
              />
            </div>
            {/* Documento */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="document"
                placeholder="Documento de identidad"
                value={datosEnvio.document}
                onChange={handleEnvioChange}
                maxLength={10}
                required
              />
            </div>
            {/* Departamento */}
            <div className="col-md-6">
              <select
                className="form-control mb-2"
                name="state"
                value={datosEnvio.state}
                onChange={e => {
                  handleEnvioChange(e);
                  setDatosEnvio(prev => ({
                    ...prev,
                    state: e.target.value,
                    city: ""
                  }));
                }}
                required
              >
                <option value="">Selecciona departamento</option>
                {Object.keys(departamentosColombia).map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            {/* Ciudad */}
            <div className="col-md-6">
              <select
                className="form-control mb-2"
                name="city"
                value={datosEnvio.city}
                onChange={handleEnvioChange}
                required
                disabled={!datosEnvio.state}
              >
                <option value="">Selecciona ciudad</option>
                {datosEnvio.state &&
                  departamentosColombia[datosEnvio.state]?.map(ciudad => (
                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                  ))}
              </select>
            </div>
            {/* Dirección */}
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
            {/* Código Postal */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                name="postalCode"
                placeholder="Código Postal"
                value={datosEnvio.postalCode}
                onChange={handleEnvioChange}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleCompra}
            disabled={
              comprando ||
              !datosEnvio.fullName ||
              !datosEnvio.phone ||
              datosEnvio.phone.length !== 10 ||
              !datosEnvio.address ||
              !datosEnvio.state ||
              !datosEnvio.city ||
              !datosEnvio.document ||
              datosEnvio.document.length === 0 ||
              datosEnvio.document.length > 10 ||
              !datosEnvio.postalCode ||
              typeof datosEnvio.postalCode !== 'string' ||
              !isLogged
            }
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