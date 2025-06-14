import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Home.css';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-inu d-flex align-items-center">
        <div className="container text-center text-white">
          <motion.h1
            className="display-4 fw-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Collar QR Inteligente <br />
            <span className="text-dark">para tu mascota con <strong className="inu-brand">INUTrips 🐾</strong></span>
          </motion.h1>

          <motion.p
            className="lead mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Conectado a la red de transporte pet-friendly más segura de Colombia.
          </motion.p>

          <motion.div
            className="mt-4 d-flex justify-content-center flex-wrap gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/encontrar" className="btn btn-outline-light px-4">Encontrar Mascota</Link>
            <a href="https://www.inutrips.com" target="_blank" rel="noreferrer" className="btn btn-inu px-4">
              Descarga INU
            </a>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/images/Untitled.png" alt="Mascota QR" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="fw-bold text-inu">¿Qué es el collar QR INU?</h2>
            <p>
              Es un identificador inteligente que conecta a tu mascota con nuestra plataforma y servicios de transporte INUTrips.
              Si se pierde, cualquier persona puede escanear el código QR del collar y contactarte fácilmente.
            </p>
            <div className="d-flex gap-3 mt-3 flex-wrap">
              <Link to="/register" className="btn btn-success">Regístrate</Link>
              <Link to="/about" className="btn btn-outline-secondary">Conoce más sobre INU</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4 text-inu">Servicios del Collar QR</h2>
          <div className="row g-4">
            {[
              {
                icon: "bi-phone",
                title: "Escaneo Fácil",
                text: "Con solo escanear el QR, acceden al perfil de tu mascota."
              },
              {
                icon: "bi-shield-check",
                title: "Protección",
                text: "Mantén seguros los datos de tu mascota y permite reencuentros rápidos."
              },
              {
                icon: "bi-bus-front",
                title: "Integrado con INUTrips",
                text: "Registra tu mascota como pasajero para viajar contigo en nuestras rutas."
              },
              {
                icon: "bi-cloud-arrow-down",
                title: "Acceso 24/7",
                text: "Consulta los datos desde cualquier lugar con conexión."
              },
            ].map((service, idx) => (
              <motion.div className="col-md-3" key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }} viewport={{ once: true }}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <i className={`bi ${service.icon} fs-1 mb-3 text-inu`}></i>
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.text}</p>
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
          <h2 className="fw-bold">Descarga nuestra App</h2>
          <p className="mb-4">Administra tu mascota, viajes y datos desde el celular.</p>
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
