// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import ReportLostPet from './pages/ReportLostPet';
import MyPets from './pages/MyPets';
import PetInfo from './pages/PetInfo'; // Nueva importación

function App() {
  return (
    <Router>
      <header className="bg-success text-white py-4 text-center">
        <h1>QR Mascotas</h1>
        <nav className="nav justify-content-center mt-3">
          <Link className="nav-link text-white" to="/">Inicio</Link>
          <Link className="nav-link text-white" to="/about">Quiénes Somos</Link>
          <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
          <Link className="nav-link text-white" to="/report">Denunciar Mascota Perdida</Link>
          <Link className="nav-link text-white" to="/mypets">Mis Mascotas</Link>
        </nav>
      </header>

      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportLostPet />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/mascota/:qrCode" element={<PetInfo />} /> {/* Nueva ruta */}
        </Routes>
      </main>

      <footer className="bg-light py-3 text-center">
        <p>&copy; 2025 QR Mascotas | Contacto: contacto@qrm.com</p>
      </footer>
    </Router>
  );
}

export default App;
