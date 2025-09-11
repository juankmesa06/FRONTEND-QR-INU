// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
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
import NuevaMascota from './pages/NuevaMascota';
import GenerarCodigos from './pages/generar-codigos';
import VerCodigos from './pages/VerCodigos';

import Compras from './pages/Compras';
import Recuperar from './pages/Recuperar';
import ResetPassword from './pages/ResetPassword';
import UsuariosRegistrados from './pages/UsuariosRegistrados';
import MascotasAdmin from './pages/MascotasAdmin';

function App() {
  return (
    <>
      {/* Fondo animado */}
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      {/* Tu contenido principal */}
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
            <Route path="/nueva-mascota" element={ <PrivateRoute> <NuevaMascota /> </PrivateRoute>}/>

            <Route path="/generar-codigos" element={<PrivateRouteAdmin><GenerarCodigos /></PrivateRouteAdmin>} />
            <Route path="/ver-codigos" element={<PrivateRouteAdmin><VerCodigos /></PrivateRouteAdmin>} />
            <Route path="/usuarios-registrados" element={<PrivateRouteAdmin><UsuariosRegistrados /></PrivateRouteAdmin>} />
            <Route path="/compras" element={<PrivateRoute><Compras /></PrivateRoute>} />
            <Route path="/recuperar" element={<Recuperar />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/mascotas-admin" element={<PrivateRouteAdmin><MascotasAdmin /></PrivateRouteAdmin>} />
            <Route path="/restablecer-contrasena" element={<ResetPassword />} />
            
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
