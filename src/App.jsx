// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PrivateRoute from './Components/PrivateRoute';
import PrivateRouteAdmin from './Components/PrivateRouteAdmin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home.jsx';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPets from './pages/MyPets';
import ReportLostPet from './pages/ReportLostPet';
import PetInfo from './pages/PetInfo';
import CompraQR from './pages/CompraQR';
import QRGenerado from './pages/QRGenerado';
import NuevaMascota from './pages/NuevaMascota';
import GenerarCodigos from './pages/generar-codigos';
import VerCodigos from './pages/VerCodigos';

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
          <Route path="/mypets" element={ <PrivateRoute> <MyPets /> </PrivateRoute>}/>
          <Route path="/dashboard" element={ <PrivateRouteAdmin> <Dashboard /> </PrivateRouteAdmin> } />
          <Route path="/mascota/:qrCode" element={<PetInfo />} />
          <Route path="/compraqr" element={<CompraQR />} />
          <Route path="/qr-generado" element={<QRGenerado />} />
          <Route path="/nueva-mascota" element={<NuevaMascota />} />
          <Route path="/generar-codigos" element={<GenerarCodigos />} />
          <Route path="/ver-codigos" element={<VerCodigos />} />
  
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
