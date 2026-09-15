import { Routes, Route } from "react-router-dom";
import Verificacion from "./pages/Verificacion";

function Inicio() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div>
        <h1>Grupo Daros</h1>

        <p>
          Sistema de consulta y verificación.
        </p>

        <p>
          Escanea el código QR de tu documento para consultar su información.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route
        path="/v/:token"
        element={<Verificacion />}
      />
    </Routes>
  );
}