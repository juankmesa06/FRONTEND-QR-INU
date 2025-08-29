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
  const [reportHistory, setReportHistory] = useState([]);
  const [reportPage, setReportPage] = useState(0);
  const reportsPerPage = 10;
  const [compras, setCompras] = useState([]);
  const [comprasPage, setComprasPage] = useState(0);
  const comprasPerPage = 10;
  const [status, setStatus] = useState('paid');
  const [loadingCompras, setLoadingCompras] = useState(false);
  const [carrier, setCarrier] = useState('');
  const [tracking, setTracking] = useState('');
  const [selectedCompra, setSelectedCompra] = useState(null);

  // Cargar datos del dashboard
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

        // Reportes activos
        const lostRes = await fetch(`${apiUrl}/lost-pet-report`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        let lostData = [];
        if (lostRes.ok) {
          lostData = await lostRes.json();
          setLostReports(lostData);
        }

        // Historial de reportes
        const historyRes = await fetch(`${apiUrl}/lost-pet-report?limit=100&offset=0`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setReportHistory(historyData);
        }
      } catch {
        alert('Error al cargar el dashboard');
      }
    };

    fetchDashboard();
  }, [navigate, apiUrl]);

  // --- ADMIN: Gestión de compras ---
  const fetchCompras = async (status) => {
    setLoadingCompras(true);
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData?.token;
    try {
      const res = await fetch(`${apiUrl}/purchase/status/${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('No se pudieron cargar las compras');
      const data = await res.json();
      setCompras(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoadingCompras(false);
    }
  };

  useEffect(() => {
    fetchCompras(status);
    setComprasPage(0);
  }, [status, apiUrl]);

  // Marcar compra como enviada y pasar a completada directamente
  const shipCompra = async (id) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData?.token;
    try {
      // Marcar como enviada (puede dejarla en SHIPPED)
      const res = await fetch(`${apiUrl}/purchase/ship/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ carrier, trackingCode: tracking })
      });
      if (!res.ok) throw new Error('No se pudo marcar como enviada');

      // Marcar como completada (asegura que pase a COMPLETED)
      await fetch(`${apiUrl}/purchase/complete-shipping/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Compra marcada como completada');
      setCarrier('');
      setTracking('');
      setSelectedCompra(null);
      fetchCompras(status);
    } catch (e) {
      alert(e.message);
    }
  };

  // --- Desactivar alerta de mascota perdida ---
  const desactivarAlerta = async (report) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;
      const res = await fetch(`${apiUrl}/lost-pet-report/found/${report.pet_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Recarga los reportes activos
        const lostRes = await fetch(`${apiUrl}/lost-pet-report`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        let lostData = [];
        if (lostRes.ok) {
          lostData = await lostRes.json();
          setLostReports(lostData);
        }
        alert('Alerta desactivada correctamente.');
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || 'No se pudo desactivar la alerta.');
      }
    } catch {
      alert('Error al desactivar la alerta.');
    }
  };

  if (!stats) return <p className="text-center my-5">Cargando datos del dashboard...</p>;

  const petTypes = stats.petsByType.map(p => p.species);
  const petCounts = stats.petsByType.map(p => p._count);

  // Paginación reportes recientes
  const paginatedReports = reportHistory.slice(
    reportPage * reportsPerPage,
    (reportPage + 1) * reportsPerPage
  );

  // Paginación compras
  const paginatedCompras = compras.slice(
    comprasPage * comprasPerPage,
    (comprasPage + 1) * comprasPerPage
  );

  return (
    <div className="container dashboard-container py-5">
      <h2 className="text-center fw-bold mb-5">Panel de Control QR INUTrips</h2>

      {/* Sección de reportes activos */}
      <div className="mt-5">
        <h5 className="fw-bold mb-3">🚨 Mascotas reportadas como perdidas</h5>
        {lostReports.filter(r => r.is_active).length === 0 ? (
          <div className="alert alert-success text-center mb-4">
            No hay mascotas reportadas como perdidas actualmente.
          </div>
        ) : (
          <ul className="list-unstyled mb-4">
            {lostReports
              .filter(report => report.is_active)
              .map((report) => (
                <li key={report.id} className="mb-4 border-bottom pb-3">
                  <div className="mb-2">
                    <span className="badge bg-secondary">
                      ID: {report.id}
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
                    onClick={() => desactivarAlerta(report)}
                  >
                    Desactivar alerta (mascota encontrada)
                  </button>
                </li>
              ))}
          </ul>
        )}

        {/* Historial de reportes */}
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
              {paginatedReports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No hay reportes recientes.</td>
                </tr>
              ) : (
                paginatedReports.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      {rep.created_at
                        ? new Date(rep.created_at).toLocaleString('es-CO', { hour12: false })
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
          {/* Paginación reportes */}
          <div className="d-flex justify-content-center align-items-center gap-2 my-2">
            <button
              className="btn btn-sm btn-outline-warning"
              disabled={reportPage === 0}
              onClick={() => setReportPage(reportPage - 1)}
            >
              Anterior
            </button>
            <span>Página {reportPage + 1} de {Math.ceil(reportHistory.length / reportsPerPage)}</span>
            <button
              className="btn btn-sm btn-outline-warning"
              disabled={(reportPage + 1) * reportsPerPage >= reportHistory.length}
              onClick={() => setReportPage(reportPage + 1)}
            >
              Siguiente
            </button>
          </div>
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

      {/* Gestión de compras admin */}
      <section className="admin-compras-section mt-5">
        <h4 className="fw-bold mb-3">🛒 Gestión de Compras</h4>
        <div className="mb-3">
          <label className="me-2" htmlFor="status-select">Filtrar por estado:</label>
          <select
            id="status-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="pending">Pendiente</option>
            <option value="paid">Pagada</option>
            <option value="completed">Completada</option>
          </select>
        </div>
        {
          (() => {
            if (loadingCompras) {
              return <p>Cargando compras...</p>;
            }
            if (paginatedCompras.length === 0) {
              return <div className="alert alert-info">No hay compras con este estado.</div>;
            }
            return (
              <>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>ID de Compra</th>
                      <th>Items</th>
                      <th>Datos de Envío</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCompras.map((compra) => (
                      <tr key={compra.id}>
                        <td>{new Date(compra.created_at).toLocaleString('es-CO')}</td>
                        <td>{compra.id || '-'}</td>
                        <td>
                          <ul>
                            {compra.items.map((item, idx) => (
                              <li key={item.id || `${item.type}-${item.name_to_engrave || ''}-${idx}`}>
                                <strong>{item.type}</strong> - {item.name_to_engrave} <span className="badge bg-warning text-dark ms-1">${item.unit_price}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {compra.shippingInfo ? (
                            <div style={{ fontSize: "0.95rem" }}>
                              <div><strong>Nombre:</strong> {compra.shippingInfo.full_name}</div>
                              <div><strong>Tel:</strong> {compra.shippingInfo.phone}</div>
                              <div><strong>Documento:</strong> {compra.shippingInfo.document}</div>
                              <div><strong>Dirección:</strong> {compra.shippingInfo.address}</div>
                              <div><strong>Ciudad:</strong> {compra.shippingInfo.city}</div>
                              <div><strong>Depto:</strong> {compra.shippingInfo.state}</div>
                              {compra.shippingInfo.carrier && (
                                <div><strong>Transportadora:</strong> {compra.shippingInfo.carrier}</div>
                              )}
                              {compra.shippingInfo.trackingCode && (
                                <div><strong>Guía:</strong> {compra.shippingInfo.trackingCode}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">Sin datos</span>
                          )}
                        </td>
                        <td>{compra.status}</td>
                        <td>
                          {/* Si el estado es pagada, mostrar inputs y botón solo si ambos campos están completos */}
                          {compra.status === 'PAID' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                placeholder="Transportadora"
                                value={selectedCompra === compra.id ? carrier : ''}
                                onChange={e => {
                                  setSelectedCompra(compra.id);
                                  setCarrier(e.target.value);
                                }}
                                className="form-control mb-1"
                              />
                              <input
                                type="text"
                                placeholder="Código de seguimiento"
                                value={selectedCompra === compra.id ? tracking : ''}
                                onChange={e => {
                                  setSelectedCompra(compra.id);
                                  setTracking(e.target.value);
                                }}
                                className="form-control mb-1"
                              />
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => shipCompra(compra.id)}
                                disabled={!carrier.trim() || !tracking.trim() || selectedCompra !== compra.id}
                              >
                                Marcar como enviada
                              </button>
                            </div>
                          )}

                          {/* Si el estado es completada, mostrar todos los datos */}
                          {compra.status === 'COMPLETED' && (
                            <div>
                              <strong>Compra completada</strong>
                              <ul className="mt-2">
                                <li><strong>ID Compra:</strong> {compra.id}</li>
                                <li><strong>Usuario:</strong> {compra.user_id}</li>
                                <li><strong>Pago:</strong> {compra.payment_id}</li>
                                <li><strong>Fecha:</strong> {new Date(compra.created_at).toLocaleString('es-CO')}</li>
                                <li><strong>Total:</strong> ${compra.total_price}</li>
                                <li><strong>Estado:</strong> {compra.status}</li>
                                {compra.shippingInfo && (
                                  <>
                                    <li><strong>Transportadora:</strong> {compra.shippingInfo.carrier}</li>
                                    <li><strong>Guía:</strong> {compra.shippingInfo.tracking_code}</li>
                                    <li><strong>Dirección:</strong> {compra.shippingInfo.address}, {compra.shippingInfo.city}, {compra.shippingInfo.state}</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Paginación compras */}
                <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    disabled={comprasPage === 0}
                    onClick={() => setComprasPage(comprasPage - 1)}
                  >
                    Anterior
                  </button>
                  <span>Página {comprasPage + 1} de {Math.ceil(compras.length / comprasPerPage)}</span>
                  <button
                    className="btn btn-sm btn-outline-warning"
                    disabled={(comprasPage + 1) * comprasPerPage >= compras.length}
                    onClick={() => setComprasPage(comprasPage + 1)}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            );
          })()
        }
      </section>

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
              text: '🐾 Ver Códigos NO RECLAMADOS',
              route: '/ver-codigos',
              className: 'btn btn-outline-warning'
            },
            {
              text: '✅ Ver Usuarios Registrados',
              route: '/usuarios-registrados',
              className: 'btn btn-outline-success'
            },
            {
              text: '🐾 Ver Mascotas Registrados',
              route: '/mascotas-admin',
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