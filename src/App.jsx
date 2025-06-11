// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/App.css';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import ReportLostPet from './pages/ReportLostPet';
import MyPets from './pages/MyPets';
import PetInfo from './pages/PetInfo';
import Encontrar from './pages/Encontrar';
import Register from './pages/Register';
import CompraQR from './pages/CompraQR';
import QRGenerado from './pages/QRGenerado';

function App() {
  return (
    <Router>
      <header className="text-black py-4 text-center">
        <h1>QR Mascotas</h1>
        <nav className="topbar">
          <Link className="nav-link text-black" to="/">Inicio</Link>
          <Link className="nav-link text-black" to="/about">Quiénes Somos</Link>
          <Link className="nav-link text-black" to="/login">Iniciar Sesión</Link>
          <Link className="nav-link text-black" to="/report">Denunciar Mascota Perdida</Link>
          <Link className="nav-link text-black" to="/mypets">Mis Mascotas</Link>
          <Link className="nav-link text-black" to="/register">Registrarse</Link>
          <Link className="nav-link text-black" to="/CompraQr">Comprar QR</Link>
        </nav>
      </header>

      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportLostPet />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/mascota/:qrCode" element={<PetInfo />} />
          <Route path="/encontrar" element={<Encontrar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CompraQr" element={<CompraQR />} />
          <Route path="/qr-generado" element={<QRGenerado />} /> 
        </Routes>
      </main>

      <footer className="bg-light py-3 text-center">
        <p>&copy; 2025 QR Mascotas | Contacto: contacto@qrm.com</p>
      </footer>
    </Router>
  );
}

export default App;
