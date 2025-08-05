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

    const apiUrl = import.meta.env.VITE_APP_API_URL;
  // Verifica si el usuario es admin
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

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
        const res = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Error al cargar el dashboard');
        const data = await res.json();

        setStats({
          totalPets: data.totalPets ?? 0,
          qrGenerated: data.qrGenerated ?? 0,
          qrClaimed: data.qrClaimed ?? 0,
          totalActiveUsers: data.totalActiveUsers ?? 0,
          petsByType: data.petsByType ?? [],
        });

        setRecentScans([]); // Actualiza con datos reales cuando estén disponibles
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        alert('Error al cargar el dashboard');
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!stats) return <p className="text-center my-5">Cargando datos del dashboard...</p>;

  const petTypes = stats.petsByType.map(p => p.species);
  const petCounts = stats.petsByType.map(p => p._count);

  return (
    <div className="dashboard container py-5">
      <h2 className="text-center fw-bold mb-5">Panel de Control QR INUTrips</h2>

      {/* 📊 Tarjetas resumen */}
      <div className="row g-4 mb-5">
        {[
          {
            title: 'Mascotas Registradas',
            value: stats.totalPets,
            icon: 'bi bi-shield-check'
          },
          {
            title: 'QR Generados',
            value: stats.qrGenerated,
            icon: 'bi bi-qr-code'
          },
          {
            title: 'QR Activados',
            value: stats.qrClaimed,
            icon: 'bi bi-search'
          },
          {
            title: 'QR Sin Activar',
            value: stats.qrGenerated - stats.qrClaimed,
            icon: 'bi bi-search'
          },
          {
            title: 'Usuarios Activos',
            value: stats.totalActiveUsers,
            icon: 'bi bi-exclamation-triangle'
          },
          

        ].map((card, i) => (
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

      <div className="col-12 d-flex justify-content-center mb-4">
  <div style={{ width: '100%', maxWidth: '600px' }}>
    <h5 className="fw-bold mb-3 text-center">Mascotas Registradas por Especie</h5>
    <Bar
      data={{
        labels: petTypes,
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: petCounts,
          backgroundColor: ['#F9AF15', '#675544', '#4caf50', '#f44336', '#03a9f4'],
        }]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Especie'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad'
            }
          }
        }
      }}
    />
  </div>
</div>



      {/* 🧭 Botones de acción (CTA) */}
      <section className="dashboard-cta mt-5">
        <h4 className="fw-bold text-center mb-4">📌 Acciones Rápidas</h4>
        <div className="row g-3 justify-content-center">
          {[
            {
              text: '⚙️ Generar Códigos QR',
              route: '/generar-codigos',
              className: 'btn btn-outline-warning'
            },

            {
              text: '⚙️ Ver Códigos NO RECLAMADOS',
              route: '/ver-codigos',
              className: 'btn btn-outline-warning'
            }, 
          ].map((btn, index) => (
            <div className="col-12 col-md-auto" key={index}>
              <button className={`${btn.className} px-4 py-2 w-100`} onClick={() => navigate(btn.route)}>
                {btn.text}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
