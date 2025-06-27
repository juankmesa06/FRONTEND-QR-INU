// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PrivateRoute from './Components/PrivateRoute';
import ViewPet from './pages/ViewPet';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPets from './pages/MyPets';
import ReportLostPet from './pages/ReportLostPet';
import PetInfo from './pages/PetInfo';

import CompraQR from './pages/CompraQR';
import QRGenerado from './pages/QRGenerado';
import NuevaMascota from './pages/NuevaMascota';


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
          <Route path="/mascota/:id" element={<ViewPet />} />
          <Route path="/mascota/:qrCode" element={<PetInfo />} />

          <Route path="/compraqr" element={<CompraQR />} />
          <Route path="/qr-generado" element={<QRGenerado />} />
          <Route path="/nueva-mascota" element={<NuevaMascota />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
