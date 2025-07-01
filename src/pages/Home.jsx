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
      <section className="hero-inu-white d-flex align-items-center min-vh-100">
        <div className="container text-center">
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
            Bienvenido a <strong>
              <span style={{ color: '#F9AF15' }}>INU</span>
              <span style={{ color: '#675544' }}>Trips</span>
            </strong>
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
            
          </motion.div>
        </div>
      </section>

{/* APP MÓVIL INUTRIPS */}
{/* SERVICIOS DESTACADOS - APP, COLLAR, KIT INU */}
<section className="bg-light py-5 text-center">
  <div className="container">
    <h2 className="fw-bold mb-4 text-inu">¿Qué ofrece <strong className="brand-text">
            <span style={{ color: '#675544' }}>INU</span>
            <span style={{ color: '#F9AF15', marginLeft: '3px' }}>Trips</span>
          </strong>?</h2>
    <div className="row g-4">

      {/* APP MÓVIL */}
      <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
        <div className="card h-100 shadow-sm p-3">
          <img src="/images/1.5.jpg" alt="App INUTrips" className="img-fluid rounded zoom-effect mb-3" />
          <h5 className="fw-bold text-inu">App INUTrips</h5>
          <p className="small">
  Gestiona tus viajes, registra tus mascotas y accede a servicios <strong>pet-friendly</strong> desde tu celular con la app oficial de <span style={{ color: '#675544', fontWeight: 'bold' }}>INUTrips</span>.
</p>

<div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
  <a 
    href="https://play.google.com/store/apps/details?id=com.inutrips.app" 
    className="btn btn-inu btn-sm px-4"
    style={{
      backgroundColor: '#F9AF15',
      color: '#675544',
      borderRadius: '30px',
      fontWeight: '600',
      border: 'none'
    }}
  >
    Google Play
  </a>
  <a 
    href="https://apps.apple.com/co/app/tu-app-inutrips" 
    className="btn btn-outline-dark btn-sm px-4"
    style={{
      borderRadius: '30px',
      fontWeight: '600',
      border: '2px solid #675544',
      color: '#675544'
    }}
  >
    App Store
  </a>
</div>

        </div>
      </motion.div>

      {/* COLLAR QR */}
      <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
        <div className="card h-100 shadow-sm p-3">
          <img src="/images/Untitled.png" alt="Collar QR INU" className="img-fluid rounded zoom-effect mb-3" />
          <h5 className="fw-bold text-inu">Collar QR INU</h5>
          <p className="small">
  El <strong>Collar QR INU</strong> es un producto oficial de <span style={{ color: '#675544', fontWeight: 'bold' }}>INUTrips</span>, diseñado para que tu mascota esté <em>siempre identificada</em>.
  Si se pierde, cualquier persona puede escanear el QR y contactarte de inmediato.
</p>

<div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
  <Link 
    to="/register" 
    className="btn btn-inu btn-sm px-4"
    style={{
      backgroundColor: '#F9AF15',
      color: '#675544',
      borderRadius: '30px',
      fontWeight: '600',
      border: 'none'
    }}
  >
    Regístrate
  </Link>
  <Link 
    to="/CompraQr" 
    className="btn btn-outline-dark btn-sm px-4"
    style={{
      borderRadius: '30px',
      fontWeight: '600',
      border: '2px solid #675544',
      color: '#675544'
    }}
  >
    Saber más
  </Link>
</div>

          </div>
        
      </motion.div>

      {/* KIT INU */}
      <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
        <div className="card h-100 shadow-sm p-3">
          <img src="/images/1.1.jpg" alt="Kit INU" className="img-fluid rounded zoom-effect mb-3" />
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


      {/* DESCARGA APP */}

    </div>
  );
};

export default Home;
