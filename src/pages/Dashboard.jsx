import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Dashboard.css';
import { Bar } from 'react-chartjs-2';
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
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [lostReports, setLostReports] = useState([]);
  const [showLostAlert, setShowLostAlert] = useState(false);
  const [reportHistory, setReportHistory] = useState([]);

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
        // Estadísticas generales
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

        // Reportes activos y el historial de reportes (paginado)
        const lostRes = await fetch(`${apiUrl}/lost-pet-report`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        let lostData = [];
        if (lostRes.ok) {
          lostData = await lostRes.json();
          setLostReports(lostData);
          setShowLostAlert(lostData.length > 0);
        }

        const historyRes = await fetch(`${apiUrl}/lost-pet-report?limit=20&offset=0`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setReportHistory(historyData);
        }
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        alert('Error al cargar el dashboard');
      }
    };

    fetchDashboard();
  }, [navigate, apiUrl]);

  if (!stats) return <p className="text-center my-5">Cargando datos del dashboard...</p>;

  const petTypes = stats.petsByType.map(p => p.species);
  const petCounts = stats.petsByType.map(p => p._count);

  return (
    <div className="dashboard container py-5">
      <h2 className="text-center fw-bold mb-5">Panel de Control QR INUTrips</h2>

      {/* Sección combinada de reportes activos y su historial */}
      <div className="mt-5">
        <h5 className="fw-bold mb-3">🚨 Mascotas reportadas como perdidas</h5>
        {lostReports.length === 0 ? (
          <div className="alert alert-success text-center mb-4">
            No hay mascotas reportadas como perdidas actualmente.
          </div>
        ) : (
          <ul className="list-unstyled mb-4">
            {lostReports.map((report) => (
              <li key={report.id} className="mb-4 border-bottom pb-3">
                <div className="mb-2">
                  <span className="badge bg-secondary">
                    ID: {report.pet?.petCode_id}
                  </span>
                </div>
                <div className="mb-2">
                  <strong>Nombre:</strong> {report.pet?.name}
                </div>
                {report.pet?.image && (
                  <div className="mb-2">
                    <img
                      src={report.pet.image}
                      alt={report.pet.name}
                      style={{ maxWidth: 120, borderRadius: 8 }}
                    />
                  </div>
                )}
                <div>
                  <strong>Mensaje:</strong> {report.message || 'Sin mensaje'}
                </div>
                {report.location && (
                  <div>
                    <strong>Ubicación:</strong>{' '}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${report.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {report.location}
                    </a>
                  </div>
                )}
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={async () => {
                    try {
                      const userData = JSON.parse(localStorage.getItem('user'));
                      const token = userData?.token;
                      const res = await fetch(`${apiUrl}/lost-pet-report/found/${report.id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      if (res.ok) {
                        setLostReports(lostReports.filter(r => r.id !== report.id));
                        if (lostReports.length - 1 === 0) setShowLostAlert(false);
                        alert('Alerta desactivada correctamente.');
                      } else {
                        const errorData = await res.json().catch(() => ({}));
                        alert(errorData.message || 'No se pudo desactivar la alerta.');
                      }
                    } catch {
                      alert('Error al desactivar la alerta.');
                    }
                  }}
                >
                  Desactivar alerta (mascota encontrada)
                </button>
              </li>
            ))}
          </ul>
        )}

        <h5 className="fw-bold mb-3 mt-5">Historial de reportes recientes</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Mascota</th>
                <th>Mensaje</th>
                <th>Ubicación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reportHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No hay reportes recientes.</td>
                </tr>
              ) : (
                reportHistory.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      {rep.createdAt
                        ? new Date(rep.createdAt).toLocaleString('es-CO', { hour12: false })
                        : 'Sin fecha'}
                    </td>
                    <td>{rep.pet?.name || 'Sin nombre'}</td>
                    <td>{rep.message || 'Sin mensaje'}</td>
                    <td>
                      {rep.location ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${rep.location}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rep.location}
                        </a>
                      ) : 'Sin ubicación'}
                    </td>
                    <td>
                      {rep.is_active ? (
                        <span className="badge bg-danger">Activo</span>
                      ) : (
                        <span className="badge bg-success">Resuelto</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas resumen */}
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

      {/* Gráfica de mascotas por especie */}
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

      {/* Acciones rápidas */}
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
            {
              text: '✅ Compras',
              route: '/compras',
              className: 'btn btn-outline-success'
            },
            {
              text: '✅ Ver Códigos Reclamados y Usuarios',
              route: '/codigos-reclamados',
              className: 'btn btn-outline-success'
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