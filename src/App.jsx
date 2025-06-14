import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

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
      <Navbar />

      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportLostPet />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/mascota/:qrCode" element={<PetInfo />} />
          <Route path="/encontrar" element={<Encontrar />} />
          <Route path="/compraqr" element={<CompraQR />} />
          <Route path="/qr-generado" element={<QRGenerado />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
