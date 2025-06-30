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
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      const roles = userData?.user?.roles || [];

      if (!roles.includes('admin')) {
        alert('Acceso restringido solo a administradores');
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Error al cargar el dashboard');
        const data = await res.json();
        setStats(data.stats);
        setRecentScans(data.recentScans);
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        alert('Error al cargar el dashboard');
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!stats) return <p className="text-center my-5">Cargando datos del dashboard...</p>;

  const petTypes = stats.petsByType.map(p => p.type);
  const petCounts = stats.petsByType.map(p => p.count);

  return (
    <div className="dashboard container py-5">
      <h2 className="text-center fw-bold mb-5">Panel de Control INUTrips</h2>

      {/* Cards resumen */}
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

      {/* Gráficos */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Distribución por Tipo de Mascota</h5>
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

      {/* Tabla escaneos recientes */}
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

      {/* Botones CTA */}
      <div className="text-center d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
        <button
          className="btn btn-inu px-4 py-2"
          onClick={() => navigate('/nueva-mascota')}
        >
          🐶 Registrar Mascota
        </button>

        <button
          className="btn btn-outline-warning px-4 py-2"
          onClick={() => navigate('/generar-codigos')}
        >
          ⚙️ Generar Códigos QR
        </button>

        <button
          className="btn btn-outline-secondary px-4 py-2"
          onClick={() => navigate('/ver-codigos')}
        >
          📄 Ver Códigos Generados
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
