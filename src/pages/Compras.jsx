import React, { useEffect, useState } from 'react';
import '../assets/Compras.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Compras = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  const generarFactura = (compra) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Factura INUTrips', 14, 18);

    // Datos generales de la compra
    doc.setFontSize(12);
    doc.text(`ID de compra: ${compra.id || '-'}`, 14, 28);
    doc.text(`ID de usuario: ${compra.user_id || '-'}`, 14, 36);
    doc.text(`ID de pago: ${compra.payment_id || '-'}`, 14, 44);
    doc.text(`Fecha: ${compra.created_at ? new Date(compra.created_at).toLocaleString('es-CO') : '-'}`, 14, 52);
    doc.text(`Estado de pago: ${compra.status || '-'}`, 14, 60);

    // Datos de envío
    const shipping = compra.shippingInfo || {};
    doc.text('Datos de envío:', 14, 72);
    doc.setFontSize(11);
    doc.text(`Nombre: ${shipping.full_name || '-'}`, 16, 80);
    doc.text(`Documento: ${shipping.document || '-'}`, 16, 86);
    doc.text(`Teléfono: ${shipping.phone || '-'}`, 16, 92);
    doc.text(`Dirección: ${shipping.address || '-'}`, 16, 98);
    doc.text(`Ciudad: ${shipping.city || '-'} (${shipping.state || '-'})`, 16, 104);
    doc.text(`Código Postal: ${shipping.postal_code || '-'}`, 16, 110);
    doc.text(`Estado de envío: ${shipping.status || '-'}`, 16, 116);
    doc.text(`Transportadora: ${shipping.carrier || '-'}`, 16, 122);
    doc.text(`Guía: ${shipping.tracking_code || '-'}`, 16, 128);

    // Tabla de items
    doc.setFontSize(12);
    autoTable(doc, {
      startY: 138,
      head: [['Tipo', 'Nombre Grabado', 'Precio Unitario']],
      body: (compra.items || []).map(item => [
        item.type,
        item.name_to_engrave,
        `$${item.unit_price}`
      ]),
    });
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 138;
    doc.text(`Total pagado: $${compra.total_price || '-'}`, 14, finalY + 10);

    // Mensaje final
    doc.text('¡Gracias por tu compra en INUTrips!', 14, finalY + 20);

    doc.save(`Factura_INUTrips_${compra.id || ''}.pdf`);
  };

  useEffect(() => {
    const fetchCompras = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

  if (loading) return <p className="text-center my-5">Cargando compras...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Mis Compras</h2>
    <div className="compras-container">
      <h2 className="compras-title">Mis Compras</h2>
      {compras.length === 0 ? (
        <div className="alert alert-info">No tienes compras registradas.</div>
      ) : (
        <table className="table table-bordered">
        <table className="table table-bordered compras-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Items</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Factura</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, idx) => (
              <tr key={idx}>
                <td>{new Date(compra.createdAt).toLocaleString('es-CO')}</td>
                <td>{new Date(compra.created_at).toLocaleString('es-CO')}</td>
                <td>
                  <ul>
                  <ul className="compras-items-list">
                    {compra.items.map((item, i) => (
                      <li key={i}>
                        {item.type} - {item.nameToEngrave} (${item.price})
                        {item.type} - {item.name_to_engrave} (${item.unit_price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{compra.status || 'Pendiente'}</td>
                <td>${compra.total || '-'}</td>
                <td>
                  <span className={`compras-status ${compra.status || 'Pendiente'}`}>
                    {compra.status || 'Pendiente'}
                  </span>
                </td>
                <td>${compra.total_price || '-'}</td>
                <td>
                  {compra.status && (compra.status.toLowerCase() === 'paid' || compra.status.toLowerCase() === 'completed') ? (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => generarFactura(compra)}
                      title="Descargar factura PDF"
                    >
                      <i className="bi bi-file-earmark-pdf"></i> Factura
                    </button>
                  ) : (
                    <span className="text-muted">No disponible</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );


export default Compras;