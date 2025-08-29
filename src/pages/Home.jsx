import React from 'react';
import { Link } from "react-router-dom";
import '../assets/Home.css';
import { Carousel } from 'react-bootstrap';

const images = [
  '/images/banner-inutrips-principal.jpg',
];

const Home = () => {
  return (
    <>
      {/* Carrusel principal */}
      <Carousel fade controls={false} indicators interval={3500}>
        {images.map((img) => (
          <Carousel.Item key={img}>
            <img
              className="d-block w-100 hero-img shadow-drop-left-right"
              src={img}
              alt={`slide-${img}`}
              style={{
                maxHeight: '350px',
                objectFit: 'cover',
                width: '100%',
                borderRadius: '1.5rem'
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* SERVICIOS DESTACADOS */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="fw-bold mb-5 text-inu text-center">
            ¿Qué ofrece <span className="brand-inu" style={{ fontSize: '3rem' }}>INU<span className="brand-trips" style={{ fontSize: '3rem' }}>Trips</span></span>?
          </h2>

          {/* APP INUTrips */}
          <div className="row g-5 align-items-center mb-5 flex-column flex-md-row">
            <div className="col-md-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img rounded-4 overflow-hidden shadow-sm">
                <img
                  className="img-fluid w-100 shadow-drop-left-right"
                  src="/images/5.134.jpg"
                  alt="App INUTrips"
                  style={{ objectFit: "cover", minHeight: 600, maxHeight: 700 }}
                />
              </div>
            </div>
            <div className="col-md-7 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="fw-bold text-inu mb-3 display-6">App INUTrips</h2>
              <p className="lead mb-4">
                ¡Viaja con tu mascota fácil, cómodo y seguro! Gestiona tus viajes, registra tus mascotas y accede a servicios <strong>pet-friendly</strong> desde tu celular con la app oficial de <span className="brand-inu">INUTrips</span>.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-geo-alt text-warning fs-3"></i>
                    </div>
                    <h6 className="lh-base mb-0">Viajes programados y en tiempo real</h6>
                  </div>
                </div>
                <div className="col-sm-6">
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
                  >
                    <i className="bi bi-google-play me-1"></i> Google Play
                  </a>
                  <a
                    href="https://apps.apple.com/co/app/inutrips/id6450268527"
                    className="btn btn-inu btn-sm px-4 mt-3"
                  >
                    <i className="bi bi-apple me-1"></i> App Store
                  </a>
                </h5>
              </div>
            </div>
          </div>

          {/* MEDALLA QR INU */}
          <div className="row g-5 align-items-center mb-5 flex-column flex-md-row-reverse">
            <div className="col-md-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img rounded-4 overflow-hidden shadow-sm">
                <img
                  className="img-fluid w-100 shadow-drop-left-right"
                  src="/images/juntos a todas partes.jpg"
                  alt="Medalla QR INU"
                  style={{ objectFit: "cover", minHeight: 600, maxHeight: 700 }}
                />
              </div>
            </div>
            <div className="col-md-7 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="fw-bold text-inu mb-3 display-6">Medalla QR INU</h2>
              <p className="lead mb-4">
                ¡Tu mascota siempre identificada! El <strong>Medalla QR INU</strong> está diseñada para que tu mascota esté siempre identificada. Si se pierde, cualquier persona puede escanear el QR y contactarte de inmediato.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-award text-warning fs-3"></i>
                    </div>
                    <h6 className="lh-base mb-0">Identificación rápida</h6>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-shield-lock text-warning fs-3"></i>
                    </div>
                    <h6 className="lh-base mb-0">Datos protegidos y seguros</h6>
                  </div>
                </div>
              </div>
              <p><i className="bi bi-check-square text-warning me-2"></i>Fácil de usar y resistente</p>
              <p><i className="bi bi-check-square text-warning me-2"></i>Escaneo QR desde cualquier celular</p>
              <p><i className="bi bi-check-square text-warning me-2"></i>Personalizable con tus datos</p>
              <div className="border border-3 border-warning p-4 text-center mt-4 rounded-4 bg-white">
                <h5 className="lh-base mb-0">
                  Solicita tu Medalla QR INU<br />
                  <Link
                    to="/CompraQr"
                    className="btn btn-inu btn-lg px-4 mt-3"
                  >
                    <i className="bi bi-bag-plus me-1"></i> Solicitar Medalla
                  </Link>
                </h5>
              </div>
            </div>
          </div>

          {/* KIT INU */}
          <div className="row g-5 align-items-center flex-column flex-md-row">
            <div className="col-md-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img rounded-4 overflow-hidden shadow-sm">
                <img
                  className="img-fluid w-100 shadow-drop-left-right"
                  src="/images/1.1.jpg"
                  alt="Kit INU"
                  style={{ objectFit: "cover", minHeight: 600, maxHeight: 700 }}
                />
              </div>
            </div>
            <div className="col-md-7 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="fw-bold text-inu mb-3 display-6">Kit INU</h2>
              <p className="lead mb-4">
                ¡Viajes seguros y cómodos! Tu mascota viaja <strong className="text-warning">segura</strong> y <strong className="text-warning">cómoda</strong>. Incluye <strong>lona</strong>, <strong>cinturones</strong> y <strong>bozal especial</strong>. Tendrás todo nuestro apoyo para que los viajes de tu peludo sean felices.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-box-seam text-warning fs-3"></i>
                    </div>
                    <h6 className="lh-base mb-0">Kit completo y seguro</h6>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-xl-square bg-light me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-emoji-smile text-warning fs-3"></i>
                    </div>
                    <h6 className="lh-base mb-0">Comodidad y bienestar</h6>
                  </div>
                </div>
              </div>
              <p><i className="bi bi-check-square text-warning me-2"></i>Incluye lona, cinturones y bozal especial</p>
              <p><i className="bi bi-check-square text-warning me-2"></i>Materiales resistentes y fáciles de limpiar</p>
              <p><i className="bi bi-check-square text-warning me-2"></i>Soporte y acompañamiento INUTrips</p>
              <div className="border border-3 border-warning p-4 text-center mt-4 rounded-4 bg-white">
                <h5 className="lh-base mb-0">
                  Conoce el Kit INU<br />
                  <a
                    href="https://www.instagram.com/p/DHEyO9FTMow/?img_index=1"
                    className="btn btn-inu btn-sm px-3 mt-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <i className="bi bi-eye me-1"></i> Ver Kit INU
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;