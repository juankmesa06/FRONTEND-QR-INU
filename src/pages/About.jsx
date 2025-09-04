import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, ProgressBar } from 'react-bootstrap';
import React from 'react';
import '../assets/About.css';

function About() {
  return (
    <div className="container-fluid py-5 neu-bg" style={{ fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div className="container">
        {/* Sección principal */}
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-10 mx-auto">
            <div className="neu-card p-4 mb-4">
              <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>
                <span style={{ color: '#675544', fontWeight: 'bold', marginRight: '0.5rem' }}>INU</span>
                {' '}
                <span className="logo-trips" style={{ color: '#f9af15' }}>Trips</span>
                : Movilidad Pet-Friendly en Colombia
              </h1>
              <div className="row g-5 align-items-center mb-5 flex-column flex-md-row">
                <div className="col-md-5">
                  <div>
                    <img
                      className="img-fluid w-100 shadow-drop-left-right img-rounded-effect"
                      src="/images/3.jpg"
                      alt="Viaje seguro con mascotas"
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <p className="lead mb-4">
                    INU Trips es la primera app y plataforma de movilidad 100% pet-friendly en Colombia. Conectamos familias multiespecie con conductores capacitados, para que humanos y mascotas viajen seguros, cómodos y felices.<br /><br />
                    <strong>¿Por qué elegirnos?</strong> Nuestra app te permite programar o pedir viajes en tiempo real, registrar a tus mascotas y acceder a servicios aliados pet-friendly. Además, donamos parte de nuestros ingresos a fundaciones de animales, apoyando el rescate y bienestar de mascotas en situación vulnerable.
                  </p>
                  <div className="row g-4 mb-4">
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                          <i className="bi bi-geo-alt text-warning fs-3"></i>
                        </div>
                        <h6 className="lh-base mb-0">Viajes programados y en tiempo real</h6>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                          <i className="bi bi-shield-check text-warning fs-3"></i>
                        </div>
                        <h6 className="lh-base mb-0">Seguridad y soporte 24/7</h6>
                      </div>
                    </div>
                  </div>
                  <p><i className="bi bi-check-square text-warning me-2"></i>Registro fácil de mascotas</p>
                  <p><i className="bi bi-check-square text-warning me-2"></i>Acceso a servicios pet-friendly</p>
                  <p><i className="bi bi-check-square text-warning me-2"></i>Disponible para Android y iOS</p>
                  <div className="border border-3 border-warning p-4 text-center mt-4 rounded-4 bg-white">
                    <h5 className="lh-base mb-0">
                      Descarga la app y vive la experiencia INUTrips<br />
                      <a
                        href="https://play.google.com/store/apps/details?id=com.zqinutrips"
                        className="btn btn-inu btn-sm px-4 mt-3 me-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-google-play me-1"></i> Google Play
                      </a>
                      <a
                        href="https://apps.apple.com/co/app/inutrips/id6450268527"
                        className="btn btn-inu btn-sm px-4 mt-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-apple me-1"></i> App Store
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
              {/* Características / Features */}
              <div className="row g-4 mb-4 justify-content-center feature-row">
                <div className="col-sm-6 col-lg-4">
                  <div className="d-flex align-items-center neu-card ps-3 py-2">
                    <div className="flex-shrink-0 btn-xl-square me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 48, height: 48, background: "#e0e0e0" }}>
                      <i className="bi bi-award text-warning fs-3"></i>
                    </div>
                    <div>
                      <h5 className="lh-base text-uppercase mb-0" style={{ fontWeight: 700 }}>Medalla QR INU</h5>
                      <p className="mb-0 small">Identificador inteligente para tu mascota. Si se pierde, pueden contactarte escaneando el QR.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <div className="d-flex align-items-center neu-card ps-3 py-2">
                    <div className="flex-shrink-0 btn-xl-square me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 48, height: 48, background: "#e0e0e0" }}>
                      <i className="bi bi-box-seam text-warning fs-3"></i>
                    </div>
                    <div>
                      <h5 className="lh-base text-uppercase mb-0" style={{ fontWeight: 700 }}>Kit INU</h5>
                      <p className="mb-0 small">Accesorios de seguridad: lona, cinturones y bozal especial para proteger a tu mascota y tu vehículo.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
                <span className="badge bg-warning text-dark"><i className="bi bi-check-circle me-1"></i>Viajes programados y en tiempo real</span>
                <span className="badge bg-warning text-dark"><i className="bi bi-check-circle me-1"></i>Conductores entrenados en bienestar animal</span>
                <span className="badge bg-warning text-dark"><i className="bi bi-check-circle me-1"></i>Acceso a servicios pet-friendly</span>
              </div>
              <div className="neu-card p-4 text-center mt-4 mx-auto" style={{ maxWidth: 600 }}>
                <h4 className="lh-base text-uppercase mb-0" style={{ fontWeight: 900, color: "#f9af15" }}>
                  ¡Con INUTrips, tu mascota viaja feliz y tú ayudas a salvar vidas!
                </h4>
                <p className="mt-2 mb-0 small">
                  Parte de nuestros servicios apoya a fundaciones de animales en Colombia.
                </p>
                <div className="mt-3">
                  <ProgressBar now={30} label="30% donado a fundaciones" variant="warning" style={{ height: 18, fontWeight: 700 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Características adicionales */}
        <div className="container pt-5">
          <div className="row g-0 feature-row justify-content-center">
            <div className="col-md-6 col-lg-3">
              <div className="feature-item neu-card h-100 text-center p-4">
                <div className="feature-icon btn-xxl-square bg-warning mb-4 mt-n4 d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{ width: 64, height: 64 }}>
                  <i className="bi bi-geo-alt text-white fs-2"></i>
                </div>
                <h5 className="text-uppercase mb-3" style={{ fontWeight: 700 }}>Viajes Pet-Friendly</h5>
                <p>Viaja con tu mascota en cualquier momento, con seguridad y comodidad.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-item neu-card h-100 text-center p-4">
                <div className="feature-icon btn-xxl-square bg-warning mb-4 mt-n4 d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{ width: 64, height: 64 }}>
                  <i className="bi bi-shield-check text-white fs-2"></i>
                </div>
                <h5 className="text-uppercase mb-3" style={{ fontWeight: 700 }}>Seguridad</h5>
                <p>Conductores capacitados y accesorios para el bienestar de tu mascota y tu familia.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-item neu-card h-100 text-center p-4">
                <div className="feature-icon btn-xxl-square bg-warning mb-4 mt-n4 d-flex align-items-center justify-content-center rounded-circle mx-auto" style={{ width: 64, height: 64 }}>
                  <i className="bi bi-award text-white fs-2"></i>
                </div>
                <h5 className="text-uppercase mb-3" style={{ fontWeight: 700 }}>Medalla QR</h5>
                <p>Identifica y protege a tu mascota con nuestra medalla QR exclusiva.</p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ dinámico con Accordion */}
        <div className="container pt-5">
          <h3 className="text-inu mb-4 fw-bold text-center">Preguntas frecuentes</h3>
          <Accordion>
            <Accordion.Item eventKey="0" className="neu-card">
              <Accordion.Header>¿Cómo funciona la medalla QR?</Accordion.Header>
              <Accordion.Body>
                Cada medalla tiene un código único. Si tu mascota se pierde, quien la encuentre puede escanear el QR y contactarte fácilmente.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="neu-card">
              <Accordion.Header>¿Qué incluye el Kit INU?</Accordion.Header>
              <Accordion.Body>
                Incluye lona protectora, cinturón de seguridad y bozal especial para viajes seguros y cómodos.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="neu-card">
              <Accordion.Header>¿Cómo ayudan a las fundaciones?</Accordion.Header>
              <Accordion.Body>
                Donamos un porcentaje de cada servicio a fundaciones aliadas para el rescate y bienestar animal.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        {/* Newsletter / Contacto */}
        <div className="">
          <div className="container pb-5">
            <div className="neu-card p-5 mb-5">
              <div className="row g-5">
                <div className="col-md-6">
                  <h1 className="display-6 text-uppercase mb-4" style={{ fontWeight: 900, color: "#3d2c1e" }}>Contáctanos</h1>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-envelope-open-fill fs-1 text-warning me-4"></i>
                    <p className="fs-5 mb-0">
                      ¿Tienes dudas o quieres ser parte de nuestra comunidad? Escríbenos y te responderemos pronto.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="neu-input form-control border-0"
                        id="mail"
                        placeholder="Tu correo"
                      />
                      <label htmlFor="mail">Tu correo</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className="neu-input form-control border-0"
                        placeholder="Escribe tu mensaje"
                        id="mensaje"
                        style={{ minHeight: "100px" }}
                      ></textarea>
                      <label htmlFor="mensaje">Mensaje</label>
                    </div>
                    <button className="neu-btn w-100 py-3" type="submit">
                      Enviar mensaje
                    </button>
                  </form>
                </div>
                <div className="mt-4">
                  <p className="mb-1"><i className="bi bi-envelope-fill text-warning me-2"></i> soporte@inutrips.com</p>
                  <p className="mb-1"><i className="bi bi-telephone-fill text-warning me-2"></i> +57 300 123 4567</p>
                  <p className="mb-1"><i className="bi bi-geo-alt-fill text-warning me-2"></i> Calle 123 #45-67, Medellín, Colombia</p>
                  <p className="mb-0"><i className="bi bi-globe2 text-warning me-2"></i> <a href="https://www.inutrips.com" target="_blank" rel="noopener noreferrer">www.inutrips.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;