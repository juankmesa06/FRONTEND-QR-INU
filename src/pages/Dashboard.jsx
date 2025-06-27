// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const role = JSON.parse(localStorage.getItem('user'))?.role;

      if (role !== 'admin') {
        alert('Acceso restringido solo a administradores');
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setStats(data.stats);
        setRecentScans(data.recentScans);
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        alert('Error al cargar el dashboard');
      }
    };

    fetchDashboard();
  }, []);

  if (!stats) return <p className="text-center my-5">Cargando datos del dashboard...</p>;

  const petTypes = stats.petsByType.map(p => p.type);
  const petCounts = stats.petsByType.map(p => p.count);

  return (
    <div className="dashboard">
      <h2 className="text-center fw-bold mb-4">Panel de Control INUTrips</h2>

      {/* RESUMEN DE ESTADÍSTICAS */}
      <div className="row g-4 mb-5">
        {[{
          title: 'Mascotas Registradas', value: stats.totalPets, icon: 'bi bi-shield-check'
        }, {
          title: 'QR Generados', value: stats.qrGenerated, icon: 'bi bi-qr-code'
        }, {
          title: 'Mascotas Perdidas', value: stats.lostPets, icon: 'bi bi-exclamation-triangle'
        }, {
          title: 'Escaneos Hoy', value: stats.scansToday, icon: 'bi bi-search'
        }].map((card, i) => (
          <div className="col-md-3" key={i}>
            <div className="card stat-card text-center shadow-sm">
              <div className="card-body">
                <i className={`${card.icon} fs-1 text-inu`}></i>
                <h5 className="mt-3">{card.title}</h5>
                <h3 className="fw-bold">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GRAFICO POR TIPO DE MASCOTA */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Distribución por Tipo</h5>
          <Pie
            data={{
              labels: petTypes,
              datasets: [{
                label: 'Mascotas',
                data: petCounts,
                backgroundColor: ['#F9AF15', '#675544', '#4caf50', '#f44336']
              }]
            }}
          />
        </div>
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Escaneos por Periodo</h5>
          <Bar
            data={{
              labels: ['Día', 'Semana', 'Mes', 'Año'],
              datasets: [{
                label: 'Escaneos',
                data: [stats.scansToday, stats.scansWeek, stats.scansMonth, stats.scansYear],
                backgroundColor: '#675544'
              }]
            }}
          />
        </div>
      </div>

      {/* TABLA ESCANEOS */}
      <h4 className="fw-bold mb-3">Escaneos Recientes</h4>
      <div className="table-responsive mb-5">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>PetCode</th>
              <th>Ubicación</th>
              <th>Dispositivo</th>
            </tr>
          </thead>
          <tbody>
            {recentScans.length === 0 ? (
              <tr><td colSpan="4">No hay escaneos recientes</td></tr>
            ) : recentScans.map((scan, i) => (
              <tr key={i}>
                <td>{new Date(scan.date).toLocaleString()}</td>
                <td>{scan.petCode}</td>
                <td>{scan.location}</td>
                <td>{scan.device || 'Desconocido'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="text-center">
        
      </div>
    </div>
  );
};

export default Dashboard;
