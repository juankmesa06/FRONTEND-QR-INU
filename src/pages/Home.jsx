import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Home.css';
import { motion } from 'framer-motion';
import { Carousel } from 'react-bootstrap';

const images = [
  '/images/banner-inutrips-principal.jpg',
  
];

const Home = () => {
  return (
    <>
      {/* Solo Carrusel al inicio */}
      <section className="hero-carousel d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <Carousel fade controls={false} indicators interval={3500} className="inu-carousel shadow-lg rounded-4 overflow-hidden">
                {images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 hero-img"
                      src={img}
                      alt={`slide-${idx}`}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '350px',
                        borderRadius: '1.5rem'
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
  <section className="services-section py-5">
  <div className="container">
    <h2 className="fw-bold mb-5 text-inu text-center">
      ¿Qué ofrece <span className="brand-inu">INU<span className="brand-trips">Trips</span></span>?
    </h2>
    <div className="row g-4">
      {/* APP MÓVIL */}
      <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
        <div className="card h-100 shadow-sm p-3 border-0 service-card">
          <div className="service-img-wrapper mb-3">
            <img
              src="/images/1.5.jpg"
              alt="App INUTrips"
              className="service-img"
            />
          </div>
          <h5 className="fw-bold text-inu">App INUTrips</h5>
          <p className="small">
            Gestiona tus viajes, registra tus mascotas y accede a servicios <strong>pet-friendly</strong> desde tu celular con la app oficial de <span className="brand-inu">INUTrips</span>.
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.inutrips.app"
              className="btn btn-inu btn-sm px-4"
            >
              Google Play
            </a>
            <a
              href="https://apps.apple.com/co/app/tu-app-inutrips"
              className="btn btn-outline-dark btn-sm px-4"
            >
              App Store
            </a>
          </div>
        </div>
      </motion.div>
      {/* MEDALLA QR */}
      <motion.div
        className="col-md-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="card h-100 shadow-sm p-3 border-0 service-card">
          <div className="service-img-wrapper mb-3">
            <img
              src="/images/medallas.png"
              alt="Medalla QR INU"
              className="service-img"
            />
          </div>
          <h5 className="fw-bold text-inu">Medalla QR INU</h5>
          <p className="small">
            El <strong>Medalla QR INU</strong> es un producto oficial de <span className="brand-inu">INUTrips</span>, diseñado para que tu mascota esté <em>siempre identificada</em>.
            Si se pierde, cualquier persona puede escanear el QR y contactarte de inmediato.
          </p>
          <div className="d-flex justify-content-center mt-3">
            <Link
              to="/CompraQr"
              className="btn btn-inu btn-lg px-4"
            >
              Solicitar Medalla
            </Link>
          </div>
        </div>
      </motion.div>
      {/* KIT INU */}
      <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
        <div className="card h-100 shadow-sm p-3 border-0 service-card">
          <div className="service-img-wrapper mb-3">
            <img
              src="/images/1.1.jpg"
              alt="Kit INU"
              className="service-img"
            />
          </div>
          <h5 className="fw-bold text-inu">Kit INU</h5>
          <p className="small">Tu mascota viaja segura y cómoda. Incluye lona, cinturones y bozal especial.</p>
          <a href="https://www.instagram.com/p/DHEyO9FTMow/?img_index=1" className="btn btn-inu btn-sm px-3" target="_blank" rel="noopener noreferrer">
            Ver Kit INU
          </a>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* CÓMO FUNCIONA */}
      <section className="how-section py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-inu text-center mb-4">¿Cómo funciona?</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <img src="/images/5.1.jpg" alt="Descarga la app" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">1. Descarga la app</h6>
              <p className="small">Regístrate y crea el perfil de tu mascota.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/images/5.4.jpg" alt="Solicita tu viaje" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">2. Solicita tu viaje</h6>
              <p className="small">Elige el destino y el tipo de servicio que necesitas.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/images/5.2.jpg" alt="Viaja seguro" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">3. Viaja seguro</h6>
              <p className="small">Disfruta el trayecto con tu mascota y califica el servicio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS CONDUCTORES */}
<section className="drivers-section py-5 bg-white">
  <div className="container">
    <div className="row align-items-center flex-md-row flex-column-reverse">
      <div className="col-md-6 mt-4 mt-md-0">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold text-inu mb-3">
            ¡Únete como conductor INUTrips!
          </h2>
          <p className="lead mb-3">
            Sé parte de la comunidad que mueve a las familias multiespecie de Colombia. Conduce, gana y ayuda a que humanos y mascotas viajen seguros y felices.
          </p>
          <ul className="drivers-benefits-list mb-4">
            <li>Ingresos adicionales y pagos rápidos.</li>
            <li>Viajes programados y en tiempo real.</li>
            <li>Capacitación gratuita en bienestar animal.</li>
            <li>Soporte y acompañamiento 24/7.</li>
            <li>Acceso a Kit INU para seguridad de tu vehículo y las mascotas.</li>
            <li>Formar parte de una red pet-friendly en crecimiento.</li>
          </ul>
          <a
            href="https://allmylinks.com/inutrips"
            className="btn btn-inu btn-lg px-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero ser conductor
          </a>
        </motion.div>
      </div>
      <div className="col-md-6 text-center">
        <motion.img
          src="/images/3.1.jpg"
          alt="Conductor INUTrips"
          className="img-fluid rounded-4 shadow-sm drivers-img"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxHeight: 340, objectFit: "contain", background: "#fffbe7" }}
        />
      </div>
    </div>
  </div>
</section>

      {/* TESTIMONIOS */}
      

      {/* CONTACTO / CTA */}
      
    </>
  );
};

export default Home;