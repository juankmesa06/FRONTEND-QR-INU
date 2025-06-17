import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Home.css';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home">

      {/* HERO SECTION - INUTRIPS PRINCIPAL */}
      <section className="hero-inu-white d-flex align-items-center">
  <div className="container text-center">
    
    {/* Logo de INU */}
    <img 
      src="/images/LOGO PRINCIPAL.png" 
      alt="Logo INUTrips" 
      style={{ height: '100px', marginBottom: '20px' }} 
    />

    <motion.h1
      className="display-4 fw-bold"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Bienvenido a <strong className="inu-brand">INU Trips</strong>
    </motion.h1>

    <motion.p
      className="lead mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      La red de transporte pet-friendly más segura de Colombia.
    </motion.p>

    <motion.div
      className="mt-4 d-flex justify-content-center flex-wrap gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
    >
    <Link to="/login" className="btn btn-outline-dark px-4">Iniciar Sesión</Link>
    </motion.div>
  </div>
</section>

      

      {/* SECCIÓN ESPECIAL DEL COLLAR QR INU */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/images/Untitled.png" alt="Collar QR INU" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="fw-bold text-inu">Collar QR INU</h2>
            <p>
              Un producto oficial de INU Trips que identifica a tu mascota en todo momento. Si tu mascota se pierde, cualquier persona puede escanear el código QR del collar y contactarte fácilmente.
            </p>
            <div className="d-flex gap-3 mt-3 flex-wrap">
              <Link to="/register" className="btn btn-success">Regístrate</Link>
              <Link to="./CompraQr" className="btn btn-outline-secondary">Saber más</Link>
            </div>
          </div>
        </div>
      </section>

{/* SECCIÓN DEL KIT INU */}
<section className="kit-inu-section py-5">
  <div className="container">
    <motion.div 
      className="row align-items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="col-md-6 mb-4 mb-md-0">
        <img 
          src="/images/1.1.jpg" 
          alt="Kit INU" 
          className="img-fluid rounded shadow" 
        />
      </div>
      <div className="col-md-6">
        <h2 className="fw-bold text-inu mb-3">Kit INU</h2>
        <p className="mb-3">
          El <strong>Kit INU</strong>un producto oficial de INU Trips y esta diseñado para que los peludos
            viajen cómodos y seguros en su viaje protegiendo el vehiculo y al conductor de cualqueir anomalia que pase en el viaje.
        </p>
        <ul className="list-unstyled mb-4">
          <li>✔ Lona Antifluidos para proteccion silla trasera</li>
          <li>✔ Cinturones especiales para la seguridad de las mascotas</li>
          <li>✔ Bozal para perros PPP(perros potencialmente peligrosoa)</li>
        </ul>
        <motion.a 
          href="https://www.instagram.com/p/DHEyO9FTMow/?img_index=1" 
          className="btn btn-inu px-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Ver Kit INU
        </motion.a>
      </div>
    </motion.div>
  </div>
</section>


      {/* SERVICIOS DESTACADOS DE INUTRIPS */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4 text-inu">¿Qué ofrece INUTrips?</h2>
          <div className="row g-4">
            {[{
              icon: "bi-geo-alt",
              title: "Transporte Seguro",
              text: "Viaja con tu mascota en rutas especializadas y seguras."
            }, {
              icon: "bi-heart",
              title: "Atención Veterinaria",
              text: "Servicios veterinarios aliados a lo largo de tu viaje."
            }, {
              icon: "bi-houses",
              title: "Red de Aliados",
              text: "Conexión con hoteles, tiendas y refugios pet-friendly."
            }, {
              icon: "bi-person-badge",
              title: "Identidad Digital",
              text: "Tu mascota tiene un perfil con QR único gracias al collar."
            }].map((s, i) => (
              <motion.div key={i} className="col-md-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <i className={`bi ${s.icon} fs-1 mb-3 text-inu`}></i>
                    <h5 className="card-title">{s.title}</h5>
                    <p className="card-text">{s.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESCARGA APP */}
      <section className="download-section text-center text-white py-5">
        <div className="container">
          <h2 className="fw-bold">Descarga la App de INUTrips</h2>
          <p className="mb-4">Gestiona tus mascotas, tus viajes y tus servicios favoritos desde un solo lugar.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#" className="btn btn-dark">
              <i className="bi bi-apple me-2"></i> App Store
            </a>
            <a href="#" className="btn btn-success">
              <i className="bi bi-google-play me-2"></i> Google Play
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
