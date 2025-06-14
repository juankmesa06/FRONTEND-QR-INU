import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Home.css'; // Asegúrate de tener este archivo bien vinculado

const Home = () => {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Crea un <span className="text-primary">collar único</span> con <br />
            código QR para tu mascota
          </h1>
          <p className="lead mt-3">Identificación personalizada, segura y moderna</p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/CompraQr" className="btn btn-dark">Comprar QR</Link>
            <Link to="/Encontrar" className="btn btn-outline-primary">Encontrar a mi Mascota</Link>
            <Link to="/login" className="btn btn-outline-secondary">Iniciar Sesión</Link>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/images/mascota-qr.png" alt="Mascota QR" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="fw-bold">Cuida y protege a tus mascotas</h2>
            <p>
              Nuestra plataforma permite a los dueños identificar fácilmente a sus mascotas mediante collares con código QR.
              Estos collares contienen información vital en caso de pérdida, asegurando una rápida localización y devolución.
            </p>
            <div className="d-flex gap-3 mt-3 flex-wrap">
              <Link to="/Register" className="btn btn-success">Regístrate Aquí</Link>
              <Link to="/About" className="btn btn-outline-dark">Descubre Más</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Nuestros Servicios</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-info-circle fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">Acceso rápido</h5>
                  <p className="card-text">Consulta la información de tu mascota desde cualquier dispositivo escaneando el QR.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-shield-lock fs-1 text-success mb-3"></i>
                  <h5 className="card-title">Seguridad</h5>
                  <p className="card-text">Protección garantizada gracias a tecnologías de identificación seguras y modernas.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-brush fs-1 text-warning mb-3"></i>
                  <h5 className="card-title">Personalización</h5>
                  <p className="card-text">Diseña el collar ideal para tu mascota con diferentes estilos y colores.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-cpu fs-1 text-danger mb-3"></i>
                  <h5 className="card-title">Tecnología</h5>
                  <p className="card-text">Utilizamos QR escaneables de última generación para una rápida identificación.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <h5 className="fw-bold">INUPET 🐾</h5>
          <p className="mb-2">Identificación inteligente para tus mascotas. Fácil, rápido y seguro.</p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <span>🐶</span>
            <span>📘</span>
            <span>📸</span>
          </div>
          <div className="small">
            <span className="me-3">Compañía</span>
            <span className="me-3">Soporte</span>
            <span className="me-3">Términos y condiciones</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
