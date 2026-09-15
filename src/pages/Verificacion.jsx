import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { obtenerDocumento } from "../api/consulta.api";

export default function Verificacion() {
  const { token } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function consultar() {
      try {
        setLoading(true);

        const resultado = await obtenerDocumento(token);

        setData(resultado);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    consultar();
  }, [token]);

  if (loading) {
    return (
      <main className="page">
        <div className="card">
          <div className="spinner" />
          <p>Verificando información...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="card error">
          <div className="error-icon">!</div>

          <h1>No válido</h1>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <article className="card">

        <header>
          <span className="brand">
            GRUPO DAROS
          </span>

          <h1>Verificación</h1>

          <span className="valid">
            ✓ Documento válido
          </span>
        </header>

        <section className="content">

          <div className="field">
            <span>Folio</span>
            <strong>{data.folio}</strong>
          </div>

          <div className="field">
            <span>Nombre</span>
            <strong>{data.nombre}</strong>
          </div>

          <div className="field">
            <span>Fecha</span>
            <strong>{data.fecha}</strong>
          </div>

          <div className="field">
            <span>Estatus</span>
            <strong>{data.estatus}</strong>
          </div>

        </section>

        <footer>
          Información verificada directamente desde el sistema.
        </footer>

      </article>
    </main>
  );
}