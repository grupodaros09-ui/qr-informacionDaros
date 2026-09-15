import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerVerificacion, descargarRemisionPdf } from "../api/verificacion.api";

export default function Verificacion() {
  const { token } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarInformacion() {
      try {
        setLoading(true);
        setError("");

        const respuesta = await obtenerVerificacion(token);

        if (activo) {
          setData(respuesta);
        }
      } catch (err) {
        if (activo) {
          setError(
            err.message || "No fue posible verificar la información."
          );
        }
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    }

    cargarInformacion();

    return () => {
      activo = false;
    };
  }, [token]);

  const handleDescargarPdf = async () => {
    try {
      setDownloading(true);
      await descargarRemisionPdf(token);
    } catch (err) {
      alert("No se pudo descargar el documento en este momento: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleImprimir = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="page page-center">
        <section className="status-card">
          <div className="spinner" />
          <h2>Verificando</h2>
          <p>Estamos consultando la información del transporte/carga...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page page-center">
        <section className="status-card">
          <div className="error-circle">!</div>
          <p className="brand-name">GRUPO DAROS</p>
          <h1>No fue posible verificar</h1>
          <p className="error-message">{error}</p>
          <p className="verification-code">
            Código: <strong>{token}</strong>
          </p>
        </section>
      </main>
    );
  }

  // Normalización de datos recibidos del backend
  const folio = data?.folio || token || "V-0001";
  const estatus = (data?.estatus || data?.estado || "COMPLETADO").toUpperCase();
  const esCompletado = estatus === "COMPLETADO" || estatus === "VIGENTE";
  const origen = data?.origen || data?.origenNombre || "Origen N/D";
  const destino = data?.destino || data?.destinoNombre || "Destino N/D";
  const recibe = data?.chofer || data?.recibe || data?.usuario?.nombre || "N/A";
  const tipoOperacion = data?.tipoMovimiento || "ENVIO";
  const fecha = data?.fecha || (data?.createdAt ? new Date(data.createdAt).toLocaleString("es-MX") : "N/D");

  const detalles = data?.detalles || data?.productos || [];
  const totalUnidades = detalles.reduce(
    (sum, item) => sum + Number(item.cantidadEnviada || item.cantidad || item.cajas || 0),
    0
  );

  return (
    <main className="page">
      <article className="verification-card full-remision">
        {/* Encabezado del comprobante */}
        <header className="remision-header">
          <div className="header-top">
            <div className="truck-badge">
              <span className="icon">🚚</span>
              <span className="folio-tag">{folio}</span>
              <span className={`status-pill ${esCompletado ? "completado" : "anulado"}`}>
                ● {estatus}
              </span>
            </div>
          </div>
          <h1 className="title">Comprobante de Movimiento</h1>
        </header>

        {/* Resumen de Ubicación y Operación */}
        <section className="info-grid">
          <div className="info-box">
            <span className="info-label">ORIGEN</span>
            <strong className="info-val">{origen}</strong>
          </div>
          <div className="info-box">
            <span className="info-label">DESTINO</span>
            <strong className="info-val">{destino}</strong>
          </div>
          <div className="info-box">
            <span className="info-label">RECIBE / RESPONSABLE</span>
            <strong className="info-val">{recibe}</strong>
          </div>
          <div className="info-box">
            <span className="info-label">TIPO OPERACIÓN</span>
            <strong className="info-val">{tipoOperacion}</strong>
          </div>
        </section>

        <div className="fecha-emision">
          <span>Fecha y Hora de emisión</span>
          <strong>{fecha}</strong>
        </div>

        {/* Desglose de Productos y Taras */}
        <section className="desglose-section">
          <div className="desglose-header">
            <h3>PRODUCTOS & TARAS DESGLOSADAS</h3>
            <span className="total-badge">{totalUnidades} unidades totales</span>
          </div>

          <div className="items-list">
            {detalles.length === 0 ? (
              <p className="no-items">No hay detalle de taras registradas.</p>
            ) : (
              detalles.map((item, idx) => (
                <div key={idx} className="item-card">
                  <div className="item-info">
                    <span
                      className="color-dot"
                      style={{
                        backgroundColor: (item.colorCaja || "verde").toLowerCase() === "verde" ? "#f97316" : "#3b82f6"
                      }}
                    />
                    <div>
                      <h4 className="tara-name">
                        Tara {item.colorCaja ? item.colorCaja.charAt(0).toUpperCase() + item.colorCaja.slice(1).toLowerCase() : "Verde"}
                      </h4>
                      <p className="producto-name">
                        Producto: <span>{item.productoNombre || item.producto || "Sin especificar"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="cajas-count">
                    {item.cantidadEnviada || item.cantidad || item.cajas || 0} cajas
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Botones de Acción: Descargar Documento / Imprimir Remisión */}
        <section className="action-buttons no-print">
          <button
            className="btn btn-secondary"
            onClick={handleDescargarPdf}
            disabled={downloading}
          >
            📥 {downloading ? "Descargando..." : "Descargar Remisión (PDF)"}
          </button>
          <button className="btn btn-secondary" onClick={handleImprimir}>
            🖨️ Imprimir Remisión
          </button>
        </section>

        {/* Verificación y Seguridad */}
        <footer className="verification-footer-badge">
          <div className="shield-icon">✓</div>
          <div>
            <strong>DOCUMENTO VERIFICADO</strong>
            <p>
              Escaneado y consultado en tiempo real desde el sistema de Grupo Daros.
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}